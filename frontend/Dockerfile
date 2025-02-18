# Step 1: Use an official Node.js image as a base image
FROM node:16 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY frontend/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend code into the container
COPY frontend/ .

# Step 6: Build the React app for production
RUN npm run dev

# Step 7: Serve the built app using a lightweight server (e.g., serve)
FROM nginx:alpine

# Step 8: Copy the build directory to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the Nginx port
EXPOSE 5173

# Step 10: Run Nginx
CMD ["nginx", "-g", "daemon off;"]
