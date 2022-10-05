const PORT = 3111;

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/webLeDoHoang")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("OH nooo, error");
  });
//rút gọn đường dẫn đến thư mục
app.set("views", path.join(__dirname, "views"));
//lựa chọn cách kết xuất file (quên rồi, để search lại)
app.set("view engine", "ejs");
// lấy thông tin từ form (req.body)
app.use(express.urlencoded({ extended: true }));
//phải serve các file tĩnh như css như thế này thì mới được
// app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, "/public")));

const baiVietSchema = new mongoose.Schema({
  header: String,
  thumb_nail: String,
  img: [String],
  text: [String],
  src: String,
  preview_text: String,
});
const baiViet = mongoose.model("baiViet", baiVietSchema);
// const database = [
//   {
//     header: "An ninh lương thực-Khủng hoảng nối dài: Liều thuốc đặc trị",
//     thumb_nail: "./img/show_id_1.png",
//     src: "Trích nguồn từ báo: <a href='https://www.vietnamplus.vn/'>https://www.vietnamplus.vn/</a>",
//     img: ["./img/show_id_1_1.png", "./img/show_id_1_2.png"],
//     text: [
//       "Chế độ dinh dưỡng hợp lý đóng vai trò quan trọng đối với sức khỏe của mỗi chúng ta. Hiện nay ở Việt Nam, trên 70% số ca tử vong từ bệnh tật là do các bệnh không lây nhiễm liên quan đến dinh dưỡng. Vậy bạn có đang thắc mắc rằng không biết loại thực phẩm nào là tốt nhất cho sức khỏe?<br>Rất nhiều loại thực phẩm vừa tốt cho sức khỏe vừa ngon. Bằng cách lấp đầy bữa ăn của bạn với trái cây, rau, protein chất lượng và các loại thực phẩm toàn phần khác, bạn sẽ có những bữa ăn đầy màu sắc, đa dạng và tốt cho sức khỏe. Dưới đây là một số loại thực phẩm chứa nhiều dinh dưỡng và tốt cho sức khỏe.",
//       "Hai tháng kể từ khi Nga triển khai chiến dịch quân sự tại Ukraine cùng với những tác động tiêu cực dai dẳng của dịch COVID-19 đến chuỗi cung ứng khiến hoạt động trao đổi thương mại nông sản toàn cầu bị đình trệ, thế giới đang đứng trước nguy cơ rơi vào một cuộc khủng hoảng lương thực nghiêm trọng nhất trong lịch sử.<br>Tình huống giá tăng cao, trong khi hàng tồn kho có xu hướng giảm, đang dẫn tới nguy cơ mất an ninh lương thực. Hệ quả mà tình trạng này có thể gây ra là số người bị đói trên thế giới tăng lên, trong khi tiến trình thực hiện mục tiêu xóa đói giảm nghèo trong khuôn khổ các Mục tiêu phát triển bền vững (SDG) của Liên hợp quốc trở nên kém lạc quan hơn.<br>Liên quan đến vấn đề này, phóng viên TTXVN thường trú tại London (Vương quốc Anh), Cairo (Ai Cập) và phóng viên Ban biên tập tin Kinh tế đã có các cuộc phỏng vấn và tham khảo ý kiến chuyên gia để tìm hiểu rõ hơn về thực trạng an ninh lương thực tại các điểm nóng, đồng thời khuyến nghị giải pháp nhằm 'gỡ rối' cho thị trường. Sau đây là nội dung chính của chùm bài phỏng vấn:<br>'Nạn nhân' lớn nhất<br>Nhận định về tình hình đáp ứng lương thực hiện nay, Trưởng đại diện Tổ chức Lương thực và Nông nghiệp Liên hợp quốc (FAO) tại Việt Nam ông Rémi Nono Womdim cho phóng viên TTXVN hay: `Cả Nga và Ukraine đều là những đối tác 'thống trị' trên thị trường nông sản toàn cầu, bao gồm cả thị trường phân bón. Do đó, xung đột hiện tại sẽ mang lại nhiều rủi ro đối với các quốc gia phụ thuộc nhiều vào nhập khẩu nông sản, phân bón và năng lượng từ hai nước này.`<br></br>Điều đó có nghĩa là châu Phi và Trung Đông sẽ là hai khu vực chịu ảnh hưởng nặng nề nhất, bởi đây là thị trường tiêu thụ gần 50% số lúa mạch và ngô xuất khẩu từ Ukraine. Vốn là những quốc gia gặp rất nhiều khó khăn trong sứ mệnh chống lại nạn đói và suy dinh dưỡng, việc nguồn cung cấp lương thực từ Ukraine bị gián đoạn sẽ đẩy những quốc gia này vào tình trạng lạm phát tăng cao và hỗn loạn. Đây là điều hết sức khó khăn đối với 283 triệu người vốn đã rơi vào cảnh đói khổ ở châu Phi.<br></br>Ngoài ra, cũng theo ông Rémi Nono Womdim, bên cạnh căng thẳng Nga-Ukraine thì 'xung đột, biến đổi khí hậu và xu hướng kinh tế phát triển chậm lại (hiện đang trở nên trầm trọng hơn do đại dịch COVID-19) cũng là nguyên nhân làm gia tăng nạn đói và làm chậm tiến độ giảm tỷ lệ người bị suy dinh dưỡng trong thời gian gần đây.'<br></br>Theo phóng viên TTXVN tại Cairo, Giám đốc điều hành Trung tâm Toàn cầu về Thích ứng, một tổ chức của Hà Lan, ông Patrick Verkooijen, cũng có đồng quan điểm khi cho rằng trên thực tế, khủng hoảng lương thực đã xuất hiện tại châu Phi từ nhiều năm trước, do tình trạng biến đổi khí hậu đã gây thiệt hại nặng nề cho lĩnh vực nông nghiệp của châu lục này. Đây cũng là yếu tố khiến giá thực phẩm tại châu Phi tăng phi mã lên mức cao nhất trong gần 50 năm qua.<br></br>Cụ thể, giá lương thực đã tăng đến 20-30% trong vòng 5 năm qua ở Tây Phi, bao gồm các nước Burkina Faso, Niger, CH Chad, Mali và Nigeria. Trong giai đoạn 2015-2022, số người cần hỗ trợ lương thực khẩn cấp tăng gần 4 lần, từ 7 triệu người lên 27 triệu người. Sản lượng ngũ cốc ở một số nơi thuộc khu vực Sahel trong năm nay cũng giảm khoảng 1/3 so với năm ngoái.<br></br>Theo tính toán của FAO, giá lương thực có thể tăng thêm 20% trên toàn thế giới và người dân ở Tây Phi - vốn đang trong tình trạng khan hiếm lương thực - khó có thể kham nổi sự leo giá này.<br></br>Trong khi đó ở châu Âu, tình hình cũng không tích cực hơn. Khủng hoảng lương thực đã đẩy cao áp lực lạm phát lên các quốc gia châu Âu. Theo Cơ quan Thống kê châu Âu (Eurostat), thực phẩm (cùng với rượu và thuốc lá) đã tăng giá liên tục từ tháng 10/2021 đến nay. Cụ thể tháng 1/2022, mức tăng giá của lương thực (tính theo năm) là 3,5%, nhưng đến tháng 2/2022, con số này đã là 4,2%. Tháng 3/2022, mức tăng dự kiến là 3%. Đây là mức tăng cao thứ hai chỉ sau năng lượng.<br></br>Liên quan đến vấn đề này, trả lời phóng viên TTXVN tại Vương quốc Anh, Tiến sỹ Lương Tuấn Anh, Giảng viên Kinh tế thuộc Đại học De Monfort Leicester,  nhận định: 'Giá năng lượng và giá lương thực thiết yếu tăng cao sẽ tác động ngay tức thì đến nhiều người dân, làm trầm trọng thêm các vấn đề về an ninh lương thực.'<br></br>Với việc tăng giá của hai mặt hàng chủ chốt, người dân ở các nước châu Âu phải đối mặt với một lựa chọn khó khăn. Đó là hoặc là sưởi ấm nhưng phải cắt khẩu phần ăn, hoặc đảm bảo khẩu phần ăn nhưng không thể giữ ấm cho gia đình.<br></br>",
//       "Đầu tư và hợp tác quốc tế là chìa khóa<br>Trước tình huống cấp bách này, khi được hỏi về những giải pháp nhằm giúp thế giới tránh được kịch bản khủng hoảng lương thực nghiêm trọng, ông Rémi Nono Womdim cho rằng: 'FAO sẽ hỗ trợ các chính sách và chương trình phục hồi liên quan đến dịch COVID-19 của quốc gia thành viên trên nguyên tắc 'Tái thiết theo hướng tốt hơn,' phục hồi toàn diện, và đóng góp vào tiến trình hướng đến mục tiêu phát triển bền vững thông qua việc chuyển đổi sang một hệ thống nông sản hiệu quả, toàn diện và có khả năng chống chịu tốt hơn. Hệ thống này được kỳ vọng sẽ làm tăng tính hiệu quả của sản xuất và dinh dưỡng, thân thiện với môi trường và đặc biệt là không để ai ở lại phía sau.'<br>Đồng quan điểm trên, Viện nghiên cứu Chatham House của Vương quốc Anh, trong báo cáo mới nhất với tựa đề 'Căng thẳng tại Ukraine và các mối đe dọa đối với thị trường thực phẩm, an ninh năng lượng,' nhận định rằng thế giới nên hướng đến một kế hoạch 'Tái thiết theo hướng tốt hơn,' thay vì 'Tái thiết nhanh hơn' như đã từng xảy ra trong các cuộc khủng hoảng trước.<br>Ở góc độ cụ thể hơn, dưới tác động của cuộc khủng hoảng tại Ukraine, Tổng Giám đốc FAO Qu Dongyu đã đưa ra bốn khuyến nghị nhằm giúp thế giới khắc phục tình trạng khủng hoảng lương thực.<br>Trước tiên, cần tiếp tục duy trì dòng chảy thương mại đối với thị trường lương thực và phân bón toàn cầu. Trong đó, mọi nỗ lực cần được thực hiện để bảo vệ hoạt động sản xuất và tiếp thị cần thiết, nhằm đáp ứng nhu cầu trong nước và toàn cầu.<br>Ngoài ra, chuỗi cung ứng cần được vận hành liên tục. Điều này có nghĩa là các yếu tố bao gồm cây trồng, vật nuôi, cơ sở hạ tầng chế biến thực phẩm và tất cả các hệ thống hậu cần sẽ phải được bảo vệ.<br>Thứ hai, thế giới cần tìm kiếm những nhà cung cấp thực phẩm mới và đa dạng hơn. Các quốc gia phụ thuộc vào nhập khẩu thực phẩm từ Nga và Ukraine nên hướng tới các nhà cung cấp thay thế để chống đỡ cú sốc. Họ cũng nên dựa vào nguồn dự trữ lương thực hiện có và đa dạng hóa sản xuất trong nước để đảm bảo mọi người dân được tiếp cận với chế độ ăn uống lành mạnh.<br></br>[An ninh lương thực-Khủng hoảng nối dài: Cú knock-out địa chính trị]<br></br>Thứ ba, các nhóm người dễ bị tổn thương cần được bảo vệ. Để làm được điều này, chính phủ cần mở rộng mạng lưới an sinh xã hội, đồng thời tránh đưa ra các phản ứng chính sách một cách vội vàng. Trước khi ban hành bất kỳ biện pháp nào để đảm bảo nguồn cung cấp lương thực, cần phải xem xét những tác động tiềm tàng đối với thị trường quốc tế.<br></br>Cuối cùng, thế giới cần tăng cường tính minh bạch trong công tác thông tin liên quan đến các điều kiện thị trường toàn cầu, nhằm giúp các chính phủ và nhà đầu tư đưa ra quyết định sáng suốt khi thị trường hàng hóa nông sản có nhiều biến động.<br></br>An ninh luong thuc-Khung hoang noi dai: Lieu thuoc dac tri hinh anh 2<br></br>Chủ tịch Ngân hàng Phát triển châu Phi (AfDB) ông Akinwumi Adesina. (Ảnh: Reuters)<br></br>Trong khi đó, Chủ tịch Ngân hàng Phát triển châu Phi (AfDB) ông Akinwumi Adesina cho rằng để ứng phó với khủng hoảng lương thực, AfDB và các đối tác đặt mục tiêu huy động 1 tỷ USD nhằm thúc đẩy sản xuất lúa mỳ và các loại cây trồng khác ở châu Phi, với mục tiêu giúp 40 triệu nông dân gia tăng sản lượng lúa mỳ chịu nhiệt, gạo, đậu nành và các cây trồng khác để cung cấp lương thực cho khoảng 200 triệu người.<br></br>Theo ông Adesina, trọng tâm của những nỗ lực này là đào tạo và cung cấp cho người nông dân các kỹ thuật mới nhằm giúp họ thích ứng tốt nhất với tác động của biến đổi khí hậu.<br></br>Bảo vệ đa dạng sinh học phong phú ở châu Phi là một lộ trình để gia tăng năng suất sản xuất nông nghiệp và tìm ra các giống cây trồng mới phù hợp hơn với khí hậu khô và nóng hơn.<br></br>Đồng quan điểm này, chuyên gia kinh tế Safwat Wl Alfy, Tổng thư ký Phòng Thương mại tỉnh Biển Đỏ của Ai Cập, được phóng viên TTXVN tại Cairo dẫn lời, cho hay đầu tư vào các nước châu Phi, nhất là vào các lĩnh vực sản xuất nông nghiệp và chăn nuôi, là yếu tố rất quan trọng, qua đó giúp những nước này tự chủ hơn về lương thực trên chính mảnh đất của họ, thay vì nhập khẩu lương thực từ Nga và Ukraine.<br></br>Ngoài ra, nguyên nhân chính dẫn đến đói nghèo và xung đột chủ yếu xuất phát từ tình trạng hợp tác giữa các quốc gia hiện nay. Thực tế cho thấy tình trạng nghèo đói gia tăng trong khi dự trữ gạo, lúa mỳ, ngô (ba mặt hàng chủ lực của thế giới) không hề chịu tác động từ khủng hoảng và thậm chí đạt mức cao kỷ lục trong lịch sử.<br></br>Do vậy, các quốc gia cần đưa ra một cách tiếp cận tập thể táo bạo hơn. Trong đó, các nước phát triển như Mỹ, Nhật Bản, Liên minh châu Âu (EU) và Anh có thể ngăn chặn nạn đói bằng cách phối hợp hành động để làm hạ nhiệt thị trường lúa mỳ toàn cầu cũng như các thị trường ngũ cốc khác, đồng thời thực hiện các biện pháp để giữ cho xuất khẩu lưu thông.<br></br>Thông điệp cho Việt Nam<br></br>Là một quốc gia có nhiều thế mạnh về nông nghiệp, chuyên gia kinh tế Safwat Wl Alfy cho rằng Việt Nam có thể đóng vai trò quan trọng trong việc góp phần giải quyết cuộc khủng hoảng lương thực ở châu Phi, vì Việt Nam nổi tiếng với nhiều loại lương thực, trong đó quan trọng nhất là gạo - loại ngũ cốc có thể thay thế cho nguồn lúa mỳ nhập khẩu từ bên ngoài vào châu Phi.<br></br>Trong khi đó, Tiến sỹ Lương Tuấn Anh cho rằng để hạn chế tình trạng thiếu cung lương thực, Việt Nam cần đẩy mạnh khả năng ứng phó với biến đổi khí hậu.<br></br>Điều này có thể được thực hiện thông qua việc xây dựng các hệ thống đo đạc và dự báo thay đổi về thời tiết. Ngày nay khi công nghệ đang ngày càng phát triển, đây không còn là giải pháp quá tốn kém. Việt Nam cũng cần tăng cường đầu tư vào các dự án nghiên cứu để đánh giá tác động của biến đổi khí hậu đối với mạng lưới sản xuất và phân phối lương thực của đất nước.<br></br>Ngoài ra, khả năng thích ứng với chuỗi cung ứng toàn cầu cũng cần được nâng cao, có thể bằng cách đa dạng hóa các nhà cung ứng và thị trường, tìm tòi sản phẩm thay thế cho những mặt hàng có khả năng rủi ro cao trong chuỗi cung ứng, đồng thời nâng cao tiềm năng công nghệ để có thể sản xuất ra những mặt hàng vốn thường xuyên phải nhập khẩu để giảm sự phụ thuộc vào chuỗi cung ứng.<br></br>Việt Nam cần giúp đỡ các nhóm yếu thế trong xã hội để giảm thiểu bất bình đẳng, bởi nhóm dân số thu nhập thấp và ở vùng xa xôi hẻo lánh thường là những người phải chịu hậu quả nặng nề của khủng hoảng lương thực vì họ không có nhiều nguồn lực để chống đỡ.",
//     ],
//     preview_text:
//       "Là một quốc gia có thế mạnh về nông nghiệp, chuyên gia kinh tế Safwat Wl Alfy cho rằng Việt Nam có thể đóng vai trò quan trọng trong việc góp phần giải quyết cuộc khủng hoảng lương thực ở châu Phi.",
//   },
// ];
// const data = baiViet.find({});
// data
//   .then((r) => {
//     console.log(r);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.get("/", (req, res) => {
  baiViet
    .find({})
    .then((result) => {
      // console.log(result);
      res.render("home", { result });
    })
    .catch((e) => {
      console.log(e);
      res.render("error");
    });
});

app.get("/news", (req, res) => {
  baiViet
    .find({})
    .then((result) => {
      res.render("news", { result });
    })
    .catch((e) => {
      console.log(e);
      res.render("error");
    });
});

//show 1 bai viet
app.get("/news/:id", (req, res) => {
  const { id } = req.params;
  baiViet
    .findById(id)
    .then((baiviet) => {
      res.render("show", { baiviet });
    })
    .catch((e) => {
      console.log(e);
      res.render("error");
    });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/need_support", (req, res) => {
  res.render("need_support");
});

app.get("/supporter", (req, res) => {
  res.render("supporter");
});

app.get("/map", (req, res) => {
  res.render("map");
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
