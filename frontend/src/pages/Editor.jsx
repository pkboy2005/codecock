import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import useButtonLoader from './useButtonLoader'; // Import useButtonLoader

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const runButtonRef = useRef(null); // Added useRef for the Run button
  const { startLoading, stopLoading } = useButtonLoader(); // Added useButtonLoader

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim(); // Ensure code is a string and trimmed
    console.log('Saving code:', trimmedCode); // Debug log

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, // Use the latest code state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  };

  // Add and clean up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]); // Reattach when `code` changes

  const runProject = () => {
    setIsLoading(true); // Set loading state to true
    startLoading(runButtonRef.current); // Start loading animation

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename: data.name + (data.projLanguage === "python" ? ".py" : 
                      data.projLanguage === "java" ? ".java" : 
                      data.projLanguage === "javascript" ? ".js" : 
                      data.projLanguage === "c" ? ".c" : 
                      data.projLanguage === "cpp" ? ".cpp" : 
                      data.projLanguage === "bash" ? ".sh" : ""),
            content: code
          }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setOutput(data.run.output);
        setError(data.run.code === 1 ? true : false);
      })
      .catch((err) => {
        console.error('Error running project:', err);
        toast.error('Failed to run the project.');
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
        stopLoading(runButtonRef.current); // Stop loading animation
      });
  };

  return (
    <>
      <Navbar />
      <div className="rounded-2xl flex items-center justify-between" style={{ height: 'calc(100vh - 90px)' }}>
        <div className="w-[50%] h-full m-4 p-4 bg-[#27272a] rounded-2xl border-[5px] border-[#333351]">
          <Editor2
            onChange={(newCode) => {
              console.log('New Code:', newCode); // Debug: Log changes
              setCode(newCode || ''); // Update state
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code}
          />
        </div>

        <div className="mr-5 rounded-2xl right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="rounded-2xl flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="rounded-2xl p-0 m-0">Output</p>
            <button
              ref={runButtonRef} // Attach ref to the Run button
              className="btnNormal !w-fit !px-[20px] bg-[#3f3f96] transition-all hover:bg-[#1d1d2d]"
              onClick={runProject} // Run when clicking the button
            >
              Run
            </button>
          </div>
          <pre className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`} style={{ textWrap: "nowrap" }}>{output}</pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
