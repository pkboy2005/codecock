const useButtonLoader = () => {
  const startLoading = (button) => {
    if (button) {
      button.innerHTML =
        '<div class="flex justify-center items-center"><div class="border-4 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div></div>';
      button.disabled = true;
    }
  };

  const stopLoading = (button) => {
    if (button) {
      button.innerHTML = button.getAttribute("data-text") || "Submit";
      button.disabled = false;
    }
  };

  return { startLoading, stopLoading };
};

export default useButtonLoader;