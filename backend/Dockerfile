# Step 1: Use an official Node.js image as a base image
FROM node:16

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
COPY backend/package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend code into the container
COPY backend/ .


# Step 7: Run the backend server (adjust as needed)
CMD ["npx", "nodemon"]
