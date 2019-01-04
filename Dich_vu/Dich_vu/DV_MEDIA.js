var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU_MONGODB")
var Xu_ly_Tham_so = require('querystring')
var Port = 1001
var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Nhi_phan_Kq = ""
        console.log(Yeu_cau)
        var Ten = Yeu_cau
            .url
            .replace("/", "")
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Yeu_cau.method == "GET" && Ten != "") {
                Nhi_phan_Kq = Luu_tru.Doc_Nhi_phan_Media(Ten)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.writeHead(200, { 'Content-Type': 'image/png' });
                Dap_ung.end(Nhi_phan_Kq, 'binary');
            } else if (Yeu_cau.method == "POST" && Yeu_cau.url == "/Ghi_PDF") {

                var pdf = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Ghi_Tap_tin_PDF(pdf.Ten, pdf.Chuoi_nhi_phan)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Kq);
            } else if (Yeu_cau.method == "POST") {
                var Hinh = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Ghi_Nhi_phan_Media(Hinh.Ten, Hinh.Chuoi_nhi_phan)
                Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                Dap_ung.end(Kq);
            }

        })

    })

Dich_vu.listen(Port,
    console.log("Dịch vụ Media đang thực thi ...: " + Port)
)
