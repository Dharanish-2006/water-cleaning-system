// const form = document.getElementById("form")
// const btn = document.getElementById("submitBtn")
// const imgDiv = document.getElementById("imgDiv");

// const img = document.getElementById('img')
// function get_img(input){
//     if(input.files && input.files[0]){
//         var reader = new FileReader();
//         reader.onload = (e)=>{
//             img.setAttribute('src',e.target.result)
//             img.setAttribute('class','img')
//         }
//         reader.readAsDataURL(input.files[0])
//     }
// }
// btn.addEventListener('click', (event)=>{
//     event.preventDefault();
//     let uplImg = form.file.files[0];

//     if (uplImg.type.substr(0,5) !== "image"){
//         console.error("Only images");
//         return;
//     }

//     let img = document.createElement("img");

//     getBase64(uplImg).then(
//         data => {
//             console.log(data);
//             img.src = data;
//             imgDiv.appendChild(img)
//         }
//         )

    

// })

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ message: 'Image uploaded successfully!', imageUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ message: 'No image uploaded' });
  }
});

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
