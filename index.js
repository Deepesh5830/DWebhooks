const express = require("express");
const body_parser = require("body-parser");
// const axios = require("axios");
var path = require('path');
const axios = require('axios').default;
require('dotenv').config();
const app = express().use(body_parser.json());
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;//aurasoft

app.listen(process.env.PORT || 5000, () => {
    console.log(`webhook is lisning on port - ${token} - mytoken -${mytoken} `);
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];


    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challange);
        } else {
            res.status(403);
        }
    }
});



let msg_id = ""
let conversation_Id = ""
app.post("/webhook", async (req, res) => {
    let body_param = req.body;
    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {
            let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
            let from = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.from || 917582873793;
            let msg_body = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || "Message By vercel";
            let button_Object = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.button || {};
            msg_id = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id || "Message id not available";
            let reply_button = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.action?.button || "title not found"
            // console.log("reply_button--->", body_param?.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.action?.button[0]?.reply?.title)
            // location 
            // let latitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.latitude;
            // let longitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.longitude;
            // let name = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.name;
            // let address = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.address;

            // statuses
            let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
            // let status = body_param?.entry[0]?.changes[0]?.value?.statuses ?  body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
            // let status = body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status || "not Show any status";
            // let statuses = body_param?.entry[0]?.changes[0]?.statuses[0]|| "not Show any status";
            // let timestamp = body_param?.entry[0]?.statuses[0]?.timestamp || "not Show any timestamp";
            // let expiration_timestamp = body_param?.entry[0]?.statuses[0]?.conversation?.expiration_timestamp || "not Show any expiration_timestamp";
            // let conversation_id = body_param?.entry[0]?.statuses[0]?.conversation?.id || "not Show any conversation_id";
            // let pricing_model = body_param?.entry[0]?.statuses[0]?.pricing?.pricing_model || "not Show any pricing_model";

            let Data_Object

            if (msg_body.toLowerCase() === 'image') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: from,
                    type: "image",
                    image: {
                        link: "https://wallpapers.com/images/featured/2ygv7ssy2k0lxlzu.jpg"
                    }
                }
            } else if (msg_body.toLowerCase() === 'video') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
                    }
                }
            } else if (msg_body.toLowerCase() === 'media') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
                    }
                }
            }
            else if (msg_body.toLowerCase() === 'hello' || msg_body.toLowerCase() === 'hi' || msg_body.toLowerCase() === 'hy' ) {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    // text: {
                    //     body: `Type your preferred language ex:- Hindi, English`
                    // },
                    type: "interactive",
                    interactive: {
                        type: "button",
                        body: {
                            text: "Type Your Language"
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-123",
                                        title: "English"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-456",
                                        title: "Hindi"
                                    }
                                }
                            ]
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'english') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    // text: {
                    //     body: `Welcome To Aurasoft Can I Help You --> Type your preferred Object Ex:-Welcome,English_spoken_pdf,MERN_INFO_LIST,Aurasoft_Review,media,video,image`
                    // },
                    type: "interactive",
                    interactive: {
                        type: "button",
                        body: {
                            text: `Welcome To Aurasoft Can I Help You --> Type your preferred Object Ex:-`
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-123",
                                        title: "Welcome"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-124",
                                        title: "English_spoken_pdf"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-125",
                                        title: "MERN_INFO_LIST"
                                    }
                                },
                                // {
                                //     type: "reply",
                                //     reply: {
                                //         id: "unique-id-221",
                                //         title: "Aurasoft_Review"
                                //     }
                                // },
                                // {
                                //     type: "reply",
                                //     reply: {
                                //         id: "unique-id-227",
                                //         title: "media"
                                //     }
                                // },
                                // {
                                //     type: "reply",
                                //     reply: {
                                //         id: "unique-id-328",
                                //         title: "video"
                                //     }
                                // },
                                // {
                                //     type: "reply",
                                //     reply: {
                                //         id: "unique-id-529",
                                //         title: "image"
                                //     }
                                // }
                            ]
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'hindi') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `ऑरासॉफ्ट में आपका स्वागत है क्या मैं आपकी मदद कर सकता हूँ `
                    },
                }
            } else if (msg_body.toLowerCase() === 'welcome') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "wellcome_msg",
                        language:
                        {
                            code: "en_US"
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'english_spoken_pdf') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "document",
                    document: {
                        link: "https://www.englishwale.com/wp-content/uploads/2018/08/Spoken-English-Guru-eBook.pdf",
                        caption: "English Spoken"
                    }
                }
            } else if (msg_body.toLowerCase() === 'mern_info_list') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "interactive",
                    interactive: {
                        type: "list",
                        header: {
                            type: "text",
                            text: "MERN STICK DEVELOPER"
                        },
                        body: {
                            text: "    MongoDB — document database ,Express(.js) — Node.js web framework ,React(.js) — a client-side JavaScript framework ,Node(.js) — the premier JavaScript web server"
                        },
                        footer: {
                            text: "THANKS ALL MERN DEVELOPERS"
                        },
                        action: {
                            button: "MERN_STICK_DEVELOPMENT",
                            sections: [
                                {
                                    title: "FRENTEND",
                                    rows: [
                                        {
                                            id: "1",
                                            title: "JAVASCRIPT",
                                            description: "JavaScript is a client-side programming language"
                                        },
                                        {
                                            id: "2",
                                            title: "REACTJS",
                                            description: "React is a front-end JavaScript framework"
                                        }
                                    ]
                                },
                                {
                                    title: "BACKEND",
                                    rows: [
                                        {
                                            id: "3",
                                            title: "NODEJS",
                                            description: "Node.js is an open source server environment"
                                        },
                                        {
                                            id: "4",
                                            title: "MONGODB",
                                            description: "MongoDB’s document model is simple for developers"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'aurasoft_review') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "interactive",
                    interactive: {
                        type: "button",
                        body: {
                            text: "How Did You Like Aurasoft"
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-123",
                                        title: "Good"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-456",
                                        title: "Very Good"
                                    }
                                }
                            ]
                        }
                    }
                }
            } else if (Object.keys(button_Object).length > 0) {
                console.log("hello button")
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Hi.. you have selected, your payload is  ${button_Object.payload} , Hi.. you have selected, your text is  ${button_Object.text} `
                    }
                }
            } else {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Hi.. I This is Aurasoft, your message is  ${msg_body}`
                    }
                }
            }

            // else if (location && latitude && longitude && name && address) {
            //   Data_Object = {
            //       messaging_product: "whatsapp",
            //       to: from,
            //       type: "location",
            //       location: {
            //           latitude:45.008,
            //           longitude:12.009,
            //           name: indore,
            //           address: indore
            //       }
            //   }
            // }

            console.log("Data_Object", Data_Object);
            axios.post(`https://graph.facebook.com/v16.0/${phon_no_id}/messages?access_token=${token}`, Data_Object)
                .then(function (response) {
                    conversation_Id = response?.data?.messages[0].id
                    // body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id
                    res.sendStatus(200);
                })
                .catch(function (error) {
                    console.log("error **", error);
                    res.sendStatus(404);
                });
        } else {
            res.sendStatus(404);

            // statuses
            let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
            let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status";
            let statusId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.id : "not ID";
            let conversationId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.conversation?.id : "not conversation ID";

            if (conversation_Id && statusId && statusId === conversation_Id) {
                console.log("boat send message status **", status);
            }

        }
    }
});

app.get("/", (req, res) => {
    res.status(200).send("hello this is webhook setup");
})



// const express = require("express");
// const body_parser = require("body-parser");
// // const axios = require("axios");
// var path = require('path');
// const axios = require('axios').default;
// require('dotenv').config();
// const app = express().use(body_parser.json());
// // app.use(express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));

// const token = process.env.TOKEN;
// const mytoken = process.env.MYTOKEN;//prasath_token

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`webhook is lisning on port - ${token} - mytoken -${mytoken} `);
// });

// //to verify the callback url from dashboard side - cloud api side
// app.get("/webhook", (req, res) => {
//     let mode = req.query["hub.mode"];
//     let challange = req.query["hub.challenge"];
//     let token = req.query["hub.verify_token"];


//     if (mode && token) {
//         if (mode === "subscribe" && token === mytoken) {
//             res.status(200).send(challange);
//         } else {
//             res.status(403);
//         }
//     }
// });



// let msg_id = ""
// let conversation_Id = ""
// app.post("/webhook", async (req, res) => {
//     let body_param = req.body;
//     if (body_param.object) {
//         console.log("inside body param");
//         if (body_param.entry &&
//             body_param.entry[0].changes &&
//             body_param.entry[0].changes[0].value.messages &&
//             body_param.entry[0].changes[0].value.messages[0]
//         ) {
//             let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
//             let from = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.from || 918305764748;
//             let msg_body = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || "Message By Heroku";
//             let button_Object = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.button || {};
//             msg_id = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id || "Message id not available";
//             // location
//             // let latitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.latitude;
//             // let longitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.longitude;
//             // let name = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.name;
//             // let address = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.address;

//             // statuses
//             let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
//             // let status = body_param?.entry[0]?.changes[0]?.value?.statuses ?  body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
//             // let status = body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status || "not Show any status";
//             // let statuses = body_param?.entry[0]?.changes[0]?.statuses[0]|| "not Show any status";
//             // let timestamp = body_param?.entry[0]?.statuses[0]?.timestamp || "not Show any timestamp";
//             // let expiration_timestamp = body_param?.entry[0]?.statuses[0]?.conversation?.expiration_timestamp || "not Show any expiration_timestamp";
//             // let conversation_id = body_param?.entry[0]?.statuses[0]?.conversation?.id || "not Show any conversation_id";
//             // let pricing_model = body_param?.entry[0]?.statuses[0]?.pricing?.pricing_model || "not Show any pricing_model";


//             console.log("msg_id " + msg_id);
//             console.log("phone number " + phon_no_id);
//             console.log("from " + from);
//             console.log("boady param " + msg_body);
//             console.log("valueUpdate : - \n");
//             console.log(JSON.stringify(body_param, null, 2));
//             console.log("statusUpdate : -" + status);
//             // console.log("statusesUpdate" + statuses);
//             let Data_Object

//             if (msg_body === 'Image') {
//                 Data_Object = {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     type: "image",
//                     image: {
//                         link: "https://cdn.pixabay.com/photo/2022/08/05/21/28/strawberries-7367633_960_720.jpg"
//                     }
//                 }
//             } else if (msg_body === 'Video') {
//                 Data_Object = {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     text: {
//                         body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
//                     }
//                 }
//             } else if (msg_body === 'media') {
//                 Data_Object = {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     text: {
//                         body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
//                     }
//                 }
//             } else if (Object.keys(button_Object).length > 0) {
//                 Data_Object = {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     text: {
//                         body: `Hi.. you have selected, your payload is  ${button_Object.payload} , Hi.. you have selected, your text is  ${button_Object.text} `
//                     }
//                 }
//             } else {
//                 Data_Object = {
//                     messaging_product: "whatsapp",
//                     to: from,
//                     text: {
//                         body: `Hi.. I This is Aouasoft, your message is  ${msg_body}`
//                     }
//                 }
//             }

//             // else if (location && latitude && longitude && name && address) {
//             //     Data_Object = {
//             //         messaging_product: "whatsapp",
//             //         to: from,
//             //         type: "location",
//             //         location: {
//             //             latitude: latitude,
//             //             longitude: longitude,
//             //             name: name,
//             //             address: address
//             //         }
//             //     }
//             // }

//             console.log("Data_Object", Data_Object);
//             axios.post(`https://graph.facebook.com/v15.0/${phon_no_id}/messages?access_token=${token}`, Data_Object)
//                 .then(function (response) {
//                     console.log("Axios post api response data :=>\n", response?.data);
//                     conversation_Id = response?.data?.messages[0].id
//                     // body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id
//                     console.log("msg_id **" + msg_id);
//                     console.log("Your message ID\n :- ", response?.data?.messages[0].id);
//                     res.sendStatus(200);
//                 })
//                 .catch(function (error) {
//                     console.log("error **", error);
//                     res.sendStatus(404);
//                 });
//         } else {
//             res.sendStatus(404);
//             console.log('------------****---------------');
//             console.log(JSON.stringify(body_param, null, 2));
//             // statuses
//             let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
//             let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status";
//             let statusId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.id : "not ID";
//             let conversationId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.conversation?.id : "not conversation ID";
//             console.log('status : ', status);
//             console.log('statusId : ', statusId);
//             console.log('conversationId : ', conversationId);
//             console.log('conversation_Id ### : ', conversation_Id);
//             console.log("msg_id **#" + msg_id);

//             if (conversation_Id && statusId && statusId === conversation_Id) {
//                 console.log("boat send message status **", status);
//             }

//         }
//     }
// });

// app.get("/", (req, res) => {
//     res.status(200).send("hello this is webhook setup");
// })
