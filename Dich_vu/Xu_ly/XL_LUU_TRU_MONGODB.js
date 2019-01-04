var File = require("fs")
var Thu_muc_Du_lieu = "Du_lieu"
var Thu_muc_Media = "Media"
var Thu_muc_PDF = "Tap_tin"
var Cong_nghe = "json"
// MongoDB
var DbConnection = require('../Xu_ly/XL_KET_NOI_MONGODB');

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Lỗi ...');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

class XL_LUU_TRU {
  Doc_Thong_tin_Dich_vu() {
    var Chuoi_HTML = ""
    var Duong_dan = "index.html"
    if (File.existsSync(Duong_dan))
      Chuoi_HTML = File.readFileSync(Duong_dan)
    return Chuoi_HTML
  }
  Doc_Nhi_phan_Media(Ten) {
    var Nhi_phan = ""
    var Duong_dan = Thu_muc_Media + "//" + Ten
    if (File.existsSync(Duong_dan))
      Nhi_phan = File.readFileSync(Duong_dan)
    return Nhi_phan
  }
  Ghi_Nhi_phan_Media(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
      var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
      var Duong_dan = Thu_muc_Media + "//" + Ten
      File.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
      Kq = Loi.toString()
    }
    return Kq
  }
  Ghi_Tap_tin_PDF(Ten, Chuoi_nhi_phan) {
    var Kq = "OK"
    try {
      var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
      var Duong_dan = Thu_muc_PDF + "//" + Ten
      File.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
      Kq = Loi.toString()
    }
    return Kq
  }

  async Doc_Thong_tin_Cua_hang() {
    try {
      var db = await DbConnection.Get()
      var Cua_hang = await db.collection("Cua_hang").find({}).toArray()
      return Cua_hang
    } catch (Loi) {
      console.log(Loi)
    }
  }
  async Doc_Thong_tin_Nguoi_dung() {
    try {
      var db = await DbConnection.Get();
      var Nguoi_dung = await db.collection("Nguoi_dung").find({}).toArray()
      return Nguoi_dung
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Doc_Danh_sach(Loai_Doi_tuong) {
    try {
      var db = await DbConnection.Get()
      var Dien_thoai = await db.collection("Dien_thoai").find({}).toArray()
      return Dien_thoai
    } catch (Loi) {
      console.log(Loi)
    }
  }

  async  Doc_Danh_sach_Thanh_ly(Loai_Doi_tuong) {
    try {
      var db = await DbConnection.Get()
      var Thanh_ly = await db.collection("Thanh_ly").find({}).toArray()
      return Thanh_ly
    } catch (Loi) {
      console.log(Loi)
    }
  }
  async  Ghi_moi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {

    try {
      var db = await DbConnection.Get()
      var Kq = await db.collection(Loai_Doi_tuong).insert(Doi_tuong)
      return Kq

    } catch (Loi) {
      console.log(Loi)
    }
  }
  async Cap_nhat_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat) {
    try {
      var db = await DbConnection.Get()

      var Kq = await db.collection(Loai_Doi_tuong).update(Bieu_thuc_dieu_kien, Gia_tri_Cap_nhat)

      return Kq

    } catch (Loi) {
      console.log(Loi);
    }
  }


  // Thanh_ly_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
  //   var Kq = ""
  //   try {

  //     var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
  //     var Duong_dan_Thanh_ly = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Thanh_ly//" + Doi_tuong.Ma_so + "." + Cong_nghe
  //     File.unlinkSync(Duong_dan)
  //     var Chuoi = JSON.stringify(Doi_tuong, null, "\t")
  //     File.writeFileSync(Duong_dan_Thanh_ly, Chuoi, "UTF-8")
  //   } catch (Loi) {
  //     Kq = Loi
  //   }

  //   return Kq
  // }
  // Phuc_hoi_Doi_tuong(Loai_Doi_tuong, Doi_tuong) {
  //   var Kq = ""
  //   try {

  //     var Duong_dan = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//" + Doi_tuong.Ma_so + "." + Cong_nghe
  //     var Duong_dan_Thanh_ly = Thu_muc_Du_lieu + "//" + Loai_Doi_tuong + "//Thanh_ly//" + Doi_tuong.Ma_so + "." + Cong_nghe
  //     File.unlinkSync(Duong_dan_Thanh_ly)
  //     var Chuoi = JSON.stringify(Doi_tuong, null, "\t")
  //     File.writeFileSync(Duong_dan, Chuoi, "UTF-8")
  //   } catch (Loi) {
  //     Kq = Loi
  //   }

  //   return Kq
  // }
  async  Xoa_Doi_tuong(Loai_Doi_tuong, Bieu_thuc_dieu_kien) {
    try {
      var db = await DbConnection.Get()
      var Kq = await db.collection(Loai_Doi_tuong).remove(Bieu_thuc_dieu_kien);
      return Kq
    } catch (Loi) {
      console.log(Loi);
    }
  }
}

var Xu_ly = new XL_LUU_TRU()
module.exports = Xu_ly


