const mongoose=require("mongoose");
const Product=require("./models/product")
const products=[
    {
        name: "Aloe vera",
        img: "https://m.media-amazon.com/images/I/71zyVExA5OL._SX679_.jpg",
        price: 251,
        desc: `->Use as a daily moisturizer for face, skin, hair, moisturizing after shave lotion for men and women, loaded with nutrients such as vitamins a, c, e, b12 folic acid and much more
       -> Healthier hair: Use as a hair gel or cleansing conditioner
        for strong, shiny and dandruff free hair, great
        for use as an aftershave, hair gel, or leave in conditioner
        for shinier, healthier hair
       -> Safety warning: For external use only, keep out of the reach of children and pets, avoid contact with eyes.Paraben Free
       -> Rub a very small amount on the inside of your elbow area to test
        for any allergic reaction before use, discontinue use
        if uncomfortable or
        if irritation occurs
        -> Consult your physician before using on the spots with injury, burns, eczema, or dermatitis `,
        disease: "Wound Healing, Constipation, Skin Health, Blood Sugar"
    },
    {
       name: "Aloe vera",
        img: "https://m.media-amazon.com/images/I/71zyVExA5OL._SX679_.jpg",
        price: 156,
        desc: `->Use as a daily moisturizer for face, skin, hair, moisturizing after shave lotion for men and women, loaded with nutrients such as vitamins a, c, e, b12 folic acid and much more
       -> Healthier hair: Use as a hair gel or cleansing conditioner
        for strong, shiny and dandruff free hair, great
        for use as an aftershave, hair gel, or leave in conditioner
        for shinier, healthier hair
       -> Safety warning: For external use only, keep out of the reach of children and pets, avoid contact with eyes.Paraben Free
       -> Rub a very small amount on the inside of your elbow area to test
        for any allergic reaction before use, discontinue use
        if uncomfortable or
        if irritation occurs
        -> Consult your physician before using on the spots with injury, burns, eczema, or dermatitis `,
        disease: "Wound Healing, Constipation, Skin Health, Blood Sugar"
 },

 {
        name: "Aloe vera",
        img: "https://m.media-amazon.com/images/I/51mPebqZMhL._SX679_.jpg",
        price: 199,
        desc: `->Use as a daily moisturizer for face, skin, hair, moisturizing after shave lotion for men and women, loaded with nutrients such as vitamins a, c, e, b12 folic acid and much more
       -> Healthier hair: Use as a hair gel or cleansing conditioner
        for strong, shiny and dandruff free hair, great
        for use as an aftershave, hair gel, or leave in conditioner
        for shinier, healthier hair
       -> Safety warning: For external use only, keep out of the reach of children and pets, avoid contact with eyes.Paraben Free
       -> Rub a very small amount on the inside of your elbow area to test
        for any allergic reaction before use, discontinue use
        if uncomfortable or
        if irritation occurs
        -> Consult your physician before using on the spots with injury, burns, eczema, or dermatitis `,
        disease: "Wound Healing, Constipation, Skin Health, Blood Sugar"
     
    },
    {
        name: "Ashwagandha",
        img: "https://m.media-amazon.com/images/I/71-YqNjOeDL._SX679_.jpg",
        price: 399,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
       disease: "Arthritis, Insomnia, Anxiety, Depression"
 },
    {
        name: "Ashwagandha",
        img: "https://m.media-amazon.com/images/I/81tiMtYBLvL._SY879_.jpg",
        price: 279,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
       disease: "Arthritis, Insomnia, Anxiety, Depression"  
        },
    {
        name: "Ashwagandha",
        img: "https://m.media-amazon.com/images/I/81HHLzHnF0L._SX679_.jpg",
        price: 147,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
       disease: "Arthritis, Insomnia, Anxiety, Depression" 
},
    {
       name: "Cinnamon Casia",
        img: "https://m.media-amazon.com/images/I/611oG24oTNS._SY879_.jpg",
        price: 179,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
       disease: "Hernia, Joint Conditions, Menstral Problems" 
 },
    {
       name: "Cinnamon Casia",
        img: "https://m.media-amazon.com/images/I/51J+w4ALsdL.jpg",
        price: 350,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
        disease: "Hernia, Joint Conditions, Menstral Problems" 
  },
    {
        name: "Cinnamon Casia",
        img: "https://m.media-amazon.com/images/I/611oG24oTNS._SY879_.jpg",
        price: 179,
        desc: `->THE ONLY ASHWAGANDHA TO BE 100% SOLUBLE: The human body is made of 60% water, which makes it important for any Ashwagandha supplement to dissolve in
       water so the benefits are made available to the body. Regular Ashwagandha fails to dissolve owing to the bigger particle size. Holistic Ashwagandha is converted into nanosize using
       advanced nanotechnology to make is 100% soluble in the human body.`,
       disease: "Hernia, Joint Conditions, Menstral Problems" 
},
 {
        name: "Neem",
        img: "https://images-eu.ssl-images-amazon.com/images/I/412%2BY3k9wOL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_PIStarRatingFOUR%2CBottomLeft%2C360%2C-6_SR600%2C315_ZA138%2C445%2C290%2C400%2C400%2CAmazonEmberBold%2C12%2C4%2C0%2C0%2C5_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg",
        price: 300,
        desc: `-> NEEM JUICE FOR SKIN: Daily consumption of our pure neem juice has radiant effect on skin. It aids in diminishing skin ulcers and reduces spots on skin. Our natural neem juice for skin has regenerative properties which aids in treating skin dryness and shows signs of delayed ageing. Neem being a natural moisturiser our juice is said to lighten skin blemishes.
->ORGANIC NEEM JUICE FOR DRINKING: This neem juice is also good for conditioning of hair as natural ingredients in it that reduces hair fall and improves scalp health. Baldness is also said to be treated with consumption of neem juice. Neem has medicinal properties which makes it a worthy drink to tackle dandruff related problems.
->GOOD FOR DIGESTION: This Ayurvedic Neem Juice is extremely effective in relieving symptoms of several gastrointestinal problems including hyper acidity, diarrhea and constipation. Drinking Neem Juice improves the metabolism of your body by cleaning the stomach. It helps in removing toxins from intestines which eventually aids in better immunity. It breaks down all the required digestive juices and helps clean our liver.
->NATURAL BENEFITS OF NEEM: This Neem Leaf Juice has anti-bacterial properties and drinking this organic neem juice will help in fighting common illnesses such as cold, cough. Our juice also has anti-inflammatory properties which aids in providing soothing relief to throat and liver.
->30ML ON AN EMPTY STOMACH: This juice comes in a 1 litre bottle. Mix 30ml of Neem Juice in a glass of water (room temperature) and consume it on an empty stomach in the morning. If you are comfortable with its taste, you can also have a shot of 30ml without water to gain higher nutrition value. This juice is suitable for individuals above 12 years.`,
       disease: "Arthritis, Cough, Diabetes" 
}   
]

const seedData=async ()=>{
   await Product.insertMany(products);
   console.log("DataBase seeded");
}
module.exports=seedData;