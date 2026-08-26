FROM node:22
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
EXPOSE 8080
CMD ["node", "index.js"]