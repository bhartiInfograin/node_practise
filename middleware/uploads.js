const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    
    },
    filename: (req, file, cb) => {
        // let extensionName = file.originalname;
        if(file){
            cb(null,Date.now() + file.originalname);
        }
      
    }
})



const upload = multer({
    storage:storage,
})

module.exports = upload;


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./upload");
//     },
//     filename: (req, file, cb) => {
//         var timestamp = new Date().getTime();
//         var unixTimeStamp = Math.floor(timestamp / 1000);
//         var extensionsGet = file.originalname;
//         extensionsGet = extensionsGet.split('.');
//         extensionsGet = extensionsGet[1];


//         console.log("extensionsGet", extensionsGet)

//         if (extensionsGet === "png" || extensionsGet === "jpg" || extensionsGet === "jpeg") {
//             console.log("extensionsGet", "1");
//             if (file) {
//                 console.log("extensionsGet", "2", file);
//                 cb(null, unixTimeStamp + file.originalname)
//             }
//         } else {
//             console.log("extensionsGet", "3");
//             cb({
//                 statusCode: 403,
//                 statusMsj: file.originalname + " Image Not saported. Upload valid image"
//             });
//         }

//     }
// });

// const upload = multer({ storage: storage }).single('fileName');



// exports.upload_doc = async (req, res) => {
//     upload(req, res, err => {

//         if (err) {
//             if (err.statusCode == 403) {
//                 return res.json({ statusCode: 403, statusMsg: "Image Not saported.Upload valid image" })
//             }
//         } else {

//             const {
//                 doc_type,
//                 trackingToken,
//             } = req.body

//             if (req.file == undefined || req.file == null || req.file == "") {
//                 return res.json({ statusCode: 403, statusMsj: "pleas select image" })
//             }
//             if (doc_type == undefined || doc_type == null || doc_type == "") {
//                 return res.json({ statusCode: 403, statusMsj: "please select doc type" })
//             }
//             if (trackingToken == undefined || trackingToken == null || trackingToken == "") {
//                 return res.json({ statusCode: 403, statusMsj: "Enter valid tracking Token" })
//             }

//             userModel.findOne({ trackingToken: trackingToken })
//                 .then(data => {
//                     if (!data) {
//                         return res.status(400).json("Invalid Tracking Token")
//                     }

//                     if (data) {
//                         if (doc_type == "addressproof") {
//                             var BASE_URL = "https://www.mycreditsensei.com:5000/upload/";
//                             var url = BASE_URL + req.file.filename;
//                             var addresssUrl = url.replace(/ +/g, "%20");

//                             userModel.updateOne({ _id: data._id }, { $set: { 'document.proof_of_address': addresssUrl } })
//                                 .then(data => {
//                                     console.log("dataaaa", data)
//                                     return res.json({ statusCode: 200, statusMsj: "document uploaded successfully" })
//                                 }).catch(err => {
//                                     console.log("4545232rere", err)
//                                     return res.json({ statusCode: 400, statusMsj: err })
//                                 })
//                         }

//                         if (doc_type == "idproof") {

//                             var BASE_URL = "https://www.mycreditsensei.com:5000/upload/";
//                             var url = BASE_URL + req.file.filename;
//                             var idUrl = url.replace(/ +/g, "%20");

//                             userModel.updateOne({ _id: data._id }, { $set: { 'document.proof_of_id': idUrl } })
//                                 .then(data => {
//                                     return res.json({ statusCode: 200, statusMsj: "document uploaded successfully" })
//                                 }).catch(err => {
//                                     console.log("errrdfdf", err)
//                                     return res.json({ statusCode: 400, statusMsj: err })
//                                 })
//                         }

//                     }

//                 }).catch(err => {
//                     console.log("errrrrr", err)
//                     return res.json({ statusCode: 400, statusMsj: err })
//                 })
//         }
//     })
// }