
# build stage
#使用14.15.0的node版本作为运行软件
FROM gplane/pnpm:8.2.0-node18 as build-stage
#将此目录作为工作目录
WORKDIR /app
#复制本目录下的package文件（源文件）到工作目录（目标目录）
COPY package*.json ./
#在工作目录执行npm install 
RUN pnpm install
#将本本录下所有文件复制到目标目录
COPY . .
RUN pnpm build

# production stage
FROM nginx:stable-perl as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
