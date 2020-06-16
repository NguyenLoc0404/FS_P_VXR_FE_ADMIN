### 1.Transperent token
-Thông tin người dùng chứa trên payload
-Login => token( token ko lưu trên database)
-Logout (giả) => chỉ làm logout trên fontend
-Minhf có thể để ở param, header , queryString

### 2.Opaque token
-Thông tin người dùng chứa trên payload => ko decode
-Login => token ( token lưu trong database)
-Logout => Sau khi logout sẽ xóa token khỏi DB => ko thể sử dụng lại
-Opaque token trong loopack3 , mặc định `access_token` trên frontend gọi sẽ để vào queryString cuar request .Vd: `{{host}}/api/users?access_token={{access_token}}`

### Lưu ý với axios:
-token lưu ở header `api.defaults.headers.common["token"] = token`
-token ở queryString: `interceptors`

## Bảo mật token + tăng UX
-Khi token hết hạn => tự động reset token ( có thể lưu token trong db)
-Rút ngắn thời gian hết hạn token (1h)
-Bảo đảm user ko share token cho nhau `fingerprint` , package `fingerprints2`