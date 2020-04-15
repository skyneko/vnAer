## Buff like và view cho trang http://spirit.vietnamairlines.com/

### sử dụng: 

```
git clone https://github.com/skyneko/vnAer.git
cd vnAer
```

vào file src/app.ts: 
chỉnh sửa lại url bài viết muốn tăng like và view: 

```javascript
// url bài viết 
const post_URL: string = "http://spirit.vietnamairlines.com/vi/tintuc/van-hoa-the-thao-82/vnaerathome-sat-canh-chung-tay---danh-bay-covid-19-7024.html"

// số like muốn tăng 
const likeNum: number = 100
```
tiếp tục các lệnh để hoạt động:
```
npm install && npm run build
npm start
```
