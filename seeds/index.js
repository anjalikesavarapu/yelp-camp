const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser : true,
  useUnifiedTopology:true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log("database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0;i <= 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author:'65773adb42b23592a0a25cfe',
      location: `${cities[random1000].city} ${cities[random1000].state}`,
      title : `${sample(places)} ${sample(descriptors)}`,
      description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus minus perspiciatis minima mollitia corrupti, totam eaque beatae necessitatibus, dicta aliquam ipsa velit, cumque obcaecati voluptates autem? Ex iusto temporibus ducimus?',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/daqogstxa/image/upload/v1703316451/yelp-camp/nojwuvkwfpovehiyz35t.jpg',
          filename: 'yelp-camp/nojwuvkwfpovehiyz35t',
        },
        {
          url: 'https://res.cloudinary.com/daqogstxa/image/upload/v1703316452/yelp-camp/wdrnkfmsm5aquk1ykjn0.jpg',
          filename: 'yelp-camp/wdrnkfmsm5aquk1ykjn0',
        }
      ]
    })
    await camp.save()
  }
}

seedDB().then(() =>{
  mongoose.connection.close();
})