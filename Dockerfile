# Use the specified Node.js version
FROM node:20.14.0

# Set the user to root for necessary permissions
USER root

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the app
COPY . .

# Run the build command
RUN yarn build