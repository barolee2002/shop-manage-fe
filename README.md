# Luxtech
Providing a solution for Enterprise

## Cấu trúc project

```sh
Luxtech/
└── src/
    ├── api
    ├── app
    ├── assets
    ├── features      # Các màn hình của dự án
    └── general       # Các component, constant của dự án
```

## Các câu lệnh

| Command               | Runs                           |
| --------------------- | ------------------------------ |
| `npm install`         | Cài đặt thư viện               |
| `npm run dev`         | Chạy chương trình              |
| `npm run build`       | Chạy build các module          |
| `npm run lint`        | Lint tất cả module             |
| `npm run prettier`    | Kiểm tra format file           |
| `npm run prettier:fix`| Format file với prettier       |

## Quy trình push code

  1. Viết xong code
  2. Pull code từ nhánh dev về nhánh của mình, sửa conflict : `git pull origin dev`
  3. Format code trước khi đẩy code lên: `npm run prettier:fix`
  4. Push code lên nhánh của mình : `git add .`, `git commit -m "commit ở đây"`, `git push`
  5. Lên github tạo pull request từ nhánh của mình lên nhánh dev# clothes-shop-fe
