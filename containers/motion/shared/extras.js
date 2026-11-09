/* Shivaak concept extras: container finder, pallet fit, English/Hindi switch, phone action bar.
   Load it after the page markup and BEFORE the page's own scripts, so Hindi is applied before
   any heading animation splits the text. The page sets <html data-concept="py|bp">. */
(function(){
  'use strict';
  var WA='919958446787';
  var PAGE=document.documentElement.getAttribute('data-concept')||'';

  /* ---------- language choice: ?lang=hi|en wins, then the visitor's last choice ---------- */
  var lang='en';
  try{
    var q=new URLSearchParams(location.search).get('lang');
    if(q==='hi'||q==='en'){lang=q;localStorage.setItem('shvk-lang',q)}
    else lang=localStorage.getItem('shvk-lang')||'en';
  }catch(e){}
  if(lang!=='hi')lang='en';

  /* ---------- Hindi strings. Keys are the English text; "py:" / "bp:" keys override for one page. ---------- */
  var HI={
    'Containers':'कंटेनर','Services':'सेवाएँ','Size guide':'साइज़ गाइड','FAQ':'सवाल-जवाब','Contact':'संपर्क','Get a quote':'कोटेशन पाएँ','Process':'प्रक्रिया','MENU':'मेनू','CLOSE':'बंद करें',
    'Container supply · Buy · Customise · Deliver':'कंटेनर सप्लाई · ख़रीदें · कस्टमाइज़ · डिलीवरी',
    'Every box.':'हर कंटेनर।','Every':'हर','build.':'निर्माण।','Your site.':'आपकी साइट तक।',
    'Shipping, office, storage, refrigerated and custom-built containers. Buy one ready to use, or have it built into a café, shop, home or washroom. We deliver it anywhere in India.':'शिपिंग, ऑफिस, स्टोरेज, रेफ्रिजरेटेड और कस्टम-बिल्ट कंटेनर। तैयार कंटेनर ख़रीदें, या उसे कैफ़े, दुकान, घर या वॉशरूम में बनवाएँ। हम पूरे भारत में कहीं भी डिलीवरी करते हैं।',
    'Get a free quote →':'मुफ़्त कोटेशन पाएँ →','Get a free quote':'मुफ़्त कोटेशन पाएँ','Call +91 99584 46787':'कॉल करें +91 99584 46787',
    'Reefer':'रीफ़र','Open top':'ओपन टॉप','Flat rack':'फ़्लैट रैक',
    'Supplying contractors like':'इन कॉन्ट्रैक्टरों को सप्लाई करते हैं',
    '01 / CONTAINER TYPES':'01 / कंटेनर के प्रकार','Pick your':'अपना कंटेनर','container':'चुनें',
    "From standard steel boxes to fully fitted spaces. Tell us what you need it for and we'll match the right unit.":'साधारण स्टील कंटेनर से लेकर पूरी तरह तैयार जगह तक। बताइए आपको किस काम के लिए चाहिए, हम सही कंटेनर सुझाएँगे।',
    'Shipping':'शिपिंग','Standard dry steel containers for cargo, export and general use.':'माल, एक्सपोर्ट और सामान्य उपयोग के लिए स्टैंडर्ड ड्राई स्टील कंटेनर।',
    'SITE OFFICE':'साइट ऑफिस','Office':'ऑफिस','Insulated, wired and furnished cabins for sites, sales offices and guard rooms.':'साइट, सेल्स ऑफिस और गार्ड रूम के लिए इंसुलेटेड, वायरिंग और फ़र्नीचर वाले केबिन।',
    'Insulated':'इंसुलेटेड','AC-ready':'AC के लिए तैयार','Furnished':'फ़र्नीचर सहित','FIT-OUT':'फ़िट-आउट','Custom-built':'कस्टम-बिल्ट',
    'Cafés, shops, homes and washrooms built from containers to your design.':'आपके डिज़ाइन के अनुसार कंटेनर से बने कैफ़े, दुकानें, घर और वॉशरूम।',
    'Cafés':'कैफ़े','Shops':'दुकानें','Homes':'घर','Washrooms':'वॉशरूम','SECURE':'सुरक्षित','Storage':'स्टोरेज',
    'Lockable, weather-tight storage for stock, tools, equipment and archives.':'स्टॉक, औज़ार, उपकरण और रिकॉर्ड के लिए ताला लगने वाला, मौसम-रोधी स्टोरेज।',
    'Lockable':'ताला लगने योग्य','Wind & watertight':'हवा और पानी रोधी','On-site':'साइट पर','REEFER · 45R1':'रीफ़र · 45R1','Refrigerated':'रेफ्रिजरेटेड',
    'Temperature-controlled units for food, pharma and other perishables.':'खाने, दवाओं और जल्दी ख़राब होने वाले सामान के लिए तापमान-नियंत्रित कंटेनर।',
    'Chilled':'ठंडा','Frozen':'फ़्रोज़न','Plug-in':'प्लग-इन','OPEN TOP · FLAT RACK':'ओपन टॉप · फ़्लैट रैक','Special':'स्पेशल',
    'Open top and flat rack containers for oversized and heavy cargo.':'बड़े और भारी माल के लिए ओपन टॉप और फ़्लैट रैक कंटेनर।',
    '02 / SERVICES':'02 / सेवाएँ','Buy.':'ख़रीदें।','Customise. Deliver.':'कस्टमाइज़। डिलीवरी।',
    'One supplier for the whole job, from choosing the container to setting it down on your site.':'पूरे काम के लिए एक ही सप्लायर, कंटेनर चुनने से लेकर आपकी साइट पर रखने तक।',
    'Buy':'ख़रीदें','New and used containers for keeps. Inspected before dispatch.':'हमेशा के लिए नए और पुराने कंटेनर। भेजने से पहले जाँचे जाते हैं।',
    'New & used units':'नए और पुराने कंटेनर','All standard sizes':'सभी स्टैंडर्ड साइज़','Your asset to keep':'आपकी अपनी संपत्ति','Customise':'कस्टमाइज़',
    'We cut, insulate, wire, fit and paint containers to your plan.':'हम आपके प्लान के अनुसार कंटेनर को काटते, इंसुलेट करते, वायरिंग, फ़िटिंग और पेंट करते हैं।',
    'Cafés, shops & homes':'कैफ़े, दुकानें और घर','Washrooms & offices':'वॉशरूम और ऑफिस','Doors, windows, AC, branding':'दरवाज़े, खिड़कियाँ, AC, ब्रांडिंग','Deliver':'डिलीवरी',
    'Transported and placed at your site, ready to use.':'आपकी साइट तक पहुँचाकर रखा जाता है, इस्तेमाल के लिए तैयार।',
    'Delivery all over India':'पूरे भारत में डिलीवरी','Placement on arrival':'पहुँचने पर सही जगह रखना','Scheduled to your date':'आपकी तारीख़ के अनुसार',
    '03 / SIZE GUIDE':'03 / साइज़ गाइड','Which size':'कौन-सा साइज़','fits?':'सही है?',
    'Standard ISO dimensions at a glance. Drawn to scale against a 1.75 m person.':'स्टैंडर्ड ISO माप एक नज़र में। 1.75 m के व्यक्ति के अनुपात में बनाया गया।',
    '20 ft standard.':'20 ft स्टैंडर्ड।','40 ft standard.':'40 ft स्टैंडर्ड।','40 ft high cube.':'40 ft हाई क्यूब।',
    'The most common size. Fits a small site office, kiosk, or about a one-to-two-bedroom household of goods.':'सबसे आम साइज़। छोटे साइट ऑफिस, कियोस्क या लगभग एक-दो कमरों के घरेलू सामान के लिए।',
    'Double the length. Good for bulk storage, larger offices, and long cargo.':'दोगुनी लंबाई। बड़े स्टोरेज, बड़े ऑफिस और लंबे माल के लिए अच्छा।',
    'An extra foot of height. The go-to for homes, cafés and fit-outs that need headroom.':'एक फ़ुट ज़्यादा ऊँचाई। घर, कैफ़े और ऊँचाई चाहने वाले फ़िट-आउट के लिए पहली पसंद।',
    'External (L × W × H)':'बाहरी माप (L × W × H)','Internal (L × W × H)':'अंदरूनी माप (L × W × H)','External L × W × H':'बाहरी माप L × W × H','Internal L × W × H':'अंदरूनी माप L × W × H',
    'Door opening':'दरवाज़े का माप','Capacity':'क्षमता','Tare weight':'ख़ाली वज़न','Max payload':'अधिकतम भार',
    "Figures are typical and vary slightly by manufacturer. Ask us for the exact unit's specs.":'आँकड़े सामान्य हैं और निर्माता के अनुसार थोड़े बदल सकते हैं। किसी ख़ास कंटेनर का सही माप हमसे पूछें।',
    '04 / HOW IT WORKS':'04 / कैसे काम करता है','Four steps':'आपकी साइट तक','to your site':'चार आसान क़दम',
    'STEP 01':'क़दम 01','STEP 02':'क़दम 02','STEP 03':'क़दम 03','STEP 04':'क़दम 04','Enquire':'पूछताछ',
    'Send your requirement on WhatsApp or call. Size, type, any custom work, and site location.':'WhatsApp या कॉल पर अपनी ज़रूरत बताएँ: साइज़, प्रकार, कोई कस्टम काम और साइट की लोकेशन।',
    'We recommend the right unit and send a clear price, including delivery.':'हम सही कंटेनर सुझाते हैं और डिलीवरी सहित साफ़ कीमत भेजते हैं।','Prepare':'तैयारी',
    'We inspect, or build your custom fit-out, and schedule dispatch.':'हम कंटेनर जाँचते हैं या आपका कस्टम फ़िट-आउट बनाते हैं, और भेजने की तारीख़ तय करते हैं।',
    'Your container arrives on site and is placed where you need it.':'आपका कंटेनर साइट पर पहुँचता है और जहाँ चाहिए वहाँ रखा जाता है।',
    '05 / WHY SHIVAAK':'05 / शिवाक क्यों','Built for':'काम के लिए','the job':'बना',
    'Every type, one supplier':'हर प्रकार, एक सप्लायर','Shipping, office, storage, reefer, custom and special containers from one source.':'शिपिंग, ऑफिस, स्टोरेज, रीफ़र, कस्टम और स्पेशल कंटेनर एक ही जगह से।',
    'Buy or build':'ख़रीदें या बनवाएँ','Buy a new or used container ready to use, or have it custom-built to suit your budget and timeline.':'इस्तेमाल के लिए तैयार नया या पुराना कंटेनर ख़रीदें, या अपने बजट और समय के अनुसार कस्टम बनवाएँ।',
    'Custom fabrication':'कस्टम फ़ैब्रिकेशन','Cut-outs, insulation, electrics, plumbing and finishes, built to your layout.':'कट-आउट, इंसुलेशन, बिजली, प्लंबिंग और फ़िनिश, आपके लेआउट के अनुसार।',
    'Delivered to site':'साइट तक डिलीवरी',"We handle transport and placement so you don't have to coordinate trucks.":'ट्रांसपोर्ट और रखने का काम हम सँभालते हैं, आपको ट्रक का इंतज़ाम नहीं करना पड़ता।',
    'Inspected units':'जाँचे हुए कंटेनर','Every container is checked for structure, doors and weather-tightness before it leaves.':'हर कंटेनर भेजने से पहले ढाँचे, दरवाज़ों और मौसम-रोधी होने के लिए जाँचा जाता है।',
    'Quick replies':'जल्दी जवाब','Message us on WhatsApp and talk directly to the team. No call centres.':'WhatsApp पर मैसेज करें और सीधे टीम से बात करें। कोई कॉल सेंटर नहीं।',
    '06 / FAQ':'06 / सवाल-जवाब','Questions,':'आपके सवाल,','answered':'हमारे जवाब',
    "Can't find it here? Message us on WhatsApp and we'll reply directly.":'यहाँ जवाब नहीं मिला? WhatsApp पर मैसेज करें, हम सीधे जवाब देंगे।',
    'Do you supply new and used containers?':'क्या आप नए और पुराने दोनों कंटेनर देते हैं?',
    'Yes. Used containers are a cost-effective choice for storage and site use. New units suit fit-outs and premium builds. Every unit is inspected before dispatch.':'हाँ। स्टोरेज और साइट के काम के लिए पुराने कंटेनर किफ़ायती रहते हैं। फ़िट-आउट और प्रीमियम निर्माण के लिए नए कंटेनर बेहतर हैं। हर कंटेनर भेजने से पहले जाँचा जाता है।',
    'What can you build from a container?':'कंटेनर से आप क्या-क्या बना सकते हैं?',
    'Cafés, shops, kiosks, site offices, homes, washrooms, security cabins and more. We handle cut-outs, doors and windows, insulation, electrics, plumbing, interiors and paint.':'कैफ़े, दुकानें, कियोस्क, साइट ऑफिस, घर, वॉशरूम, सिक्योरिटी केबिन और भी बहुत कुछ। कट-आउट, दरवाज़े-खिड़कियाँ, इंसुलेशन, बिजली, प्लंबिंग, इंटीरियर और पेंट, सब हम करते हैं।',
    'Do you deliver to my site?':'क्या आप मेरी साइट तक डिलीवरी करते हैं?',
    "Yes. We arrange transport and place the container at your site. Share your location and access details and we'll include delivery in your quote.":'हाँ। हम ट्रांसपोर्ट का इंतज़ाम करते हैं और कंटेनर आपकी साइट पर रखते हैं। अपनी लोकेशन और रास्ते की जानकारी भेजें, हम डिलीवरी को कोटेशन में शामिल करेंगे।',
    'What do I need to prepare at the site?':'साइट पर मुझे क्या तैयारी करनी होगी?',
    "A firm, level base (compacted ground, concrete blocks or a slab) and clear access for the delivery truck and unloading. We'll advise based on your site.":'मज़बूत और समतल ज़मीन (दबाई हुई मिट्टी, कंक्रीट ब्लॉक या स्लैब) और डिलीवरी ट्रक के आने व उतारने के लिए खुला रास्ता। आपकी साइट देखकर हम सलाह देंगे।',
    'What is a high cube container?':'हाई क्यूब कंटेनर क्या होता है?',
    "A high cube is about 30 cm (1 ft) taller than a standard container, at 9'6\" external height. It's ideal for tall cargo and for fit-outs that need extra headroom.":'हाई क्यूब, स्टैंडर्ड कंटेनर से लगभग 30 cm (1 ft) ऊँचा होता है, बाहरी ऊँचाई 9\'6"। ऊँचे माल और ज़्यादा ऊँचाई चाहने वाले फ़िट-आउट के लिए बढ़िया।',
    'How do I get a price?':'कीमत कैसे पता करें?',
    'Fill in the quote form below. It opens WhatsApp with your details filled in. Or call +91 99584 46787.':'नीचे दिया कोटेशन फ़ॉर्म भरें। इससे WhatsApp आपकी जानकारी के साथ खुल जाएगा। या कॉल करें +91 99584 46787।',
    '07 / CLIENTS':'07 / हमारे ग्राहक','Who we':'हम किन्हें','supply':'सप्लाई करते हैं','supply.':'सप्लाई करते हैं।',
    'Contractors and businesses we supply with containers.':'वे कॉन्ट्रैक्टर और कारोबार जिन्हें हम कंटेनर सप्लाई करते हैं।',
    'Road, highway and bridge contractor based in Jammu, working on BRO, PMGSY and national highway projects across Jammu & Kashmir and Uttarakhand.':'जम्मू स्थित सड़क, हाईवे और पुल निर्माण कॉन्ट्रैक्टर, जो जम्मू-कश्मीर और उत्तराखंड में BRO, PMGSY और राष्ट्रीय राजमार्ग परियोजनाओं पर काम करते हैं।',
    '08 / GET A QUOTE':'08 / कोटेशन पाएँ','08 / Get a quote':'08 / कोटेशन पाएँ','Tell us what':'बताइए आपको','you need':'क्या चाहिए',
    'Fill this in and tap send. WhatsApp opens with your enquiry ready to go. We reply with a price and options.':'यह फ़ॉर्म भरें और भेजें दबाएँ। WhatsApp आपकी पूछताछ के साथ खुल जाएगा। हम कीमत और विकल्पों के साथ जवाब देंगे।',
    'Yard':'यार्ड','YARD':'यार्ड','Yard address to be added':'यार्ड का पता जल्द जोड़ा जाएगा','We deliver to':'डिलीवरी','All over India':'पूरे भारत में','Open':'खुला','Monday to Saturday':'सोमवार से शनिवार',
    'Your name':'आपका नाम','Name':'नाम','Phone':'फ़ोन','I WANT TO':'मुझे चाहिए','I want to':'मुझे चाहिए','Not sure':'पक्का नहीं','Container type':'कंटेनर का प्रकार',
    'Shipping container':'शिपिंग कंटेनर','Office container':'ऑफिस कंटेनर','Custom-built (café / shop / home / washroom)':'कस्टम-बिल्ट (कैफ़े / दुकान / घर / वॉशरूम)','Storage container':'स्टोरेज कंटेनर','Refrigerated container':'रेफ्रिजरेटेड कंटेनर','Not sure yet':'अभी पक्का नहीं',
    'Size':'साइज़','40 ft high cube':'40 ft हाई क्यूब','Quantity':'संख्या','Delivery city / site':'डिलीवरी शहर / साइट','Details (optional)':'जानकारी (वैकल्पिक)','Details':'जानकारी',
    'Send enquiry on WhatsApp':'WhatsApp पर पूछताछ भेजें','Send on WhatsApp':'WhatsApp पर भेजें',
    'Opens WhatsApp to +91 99584 46787. Nothing is sent until you press send there.':'WhatsApp पर +91 99584 46787 खुलेगा। जब तक आप वहाँ भेजें नहीं दबाते, कुछ नहीं भेजा जाता।',
    'Opens WhatsApp to +91 99584 46787. Nothing is sent until you press send.':'WhatsApp पर +91 99584 46787 खुलेगा। जब तक आप भेजें नहीं दबाते, कुछ नहीं भेजा जाता।',
    'Shipping, office, storage, refrigerated, custom-built and special containers. Buy, customise, delivered all over India.':'शिपिंग, ऑफिस, स्टोरेज, रेफ्रिजरेटेड, कस्टम-बिल्ट और स्पेशल कंटेनर। ख़रीदें, कस्टमाइज़ करवाएँ, पूरे भारत में डिलीवरी।',
    'CONTACT':'संपर्क','WhatsApp us':'WhatsApp करें','EXPLORE':'देखें','Explore':'देखें','Shivaak Enterprises. All rights reserved.':'Shivaak Enterprises. सर्वाधिकार सुरक्षित।',
    'GSTIN to be added':'GSTIN जल्द जोड़ा जाएगा','Phone & WhatsApp':'फ़ोन और WhatsApp','Email':'ईमेल','Work order':'वर्क ऑर्डर',
    'Please add your name and a valid phone number.':'कृपया अपना नाम और सही फ़ोन नंबर लिखें।',
    /* blueprint 3D */
    'Shivaak Enterprises · Container supply':'Shivaak Enterprises · कंटेनर सप्लाई',
    'From':'','steel box':'स्टील बॉक्स से','to':'बनाइए','anything.':'कुछ भी।',
    'Shipping, office, storage, refrigerated, custom-built and special containers. Buy one ready to use, or have it built into a café, shop, home or washroom, then delivered anywhere in India.':'शिपिंग, ऑफिस, स्टोरेज, रेफ्रिजरेटेड, कस्टम-बिल्ट और स्पेशल कंटेनर। तैयार कंटेनर ख़रीदें, या उसे कैफ़े, दुकान, घर या वॉशरूम में बनवाएँ, फिर पूरे भारत में कहीं भी डिलीवरी।',
    'Sizes':'साइज़','Options':'विकल्प','Buy · Build':'ख़रीदें · बनवाएँ','Delivery':'डिलीवरी','Scroll to build':'स्क्रॉल करें',
    '/ Container types':'/ कंटेनर के प्रकार','One box.':'एक कंटेनर।','Six ways.':'छह रूप।',
    'Scroll to watch one steel box become every container we supply.':'स्क्रॉल करें और देखें कैसे एक स्टील कंटेनर हमारे हर प्रकार में बदलता है।',
    '02 / 06 · Site office':'02 / 06 · साइट ऑफिस','03 / 06 · Fit-out':'03 / 06 · फ़िट-आउट','04 / 06 · Secure':'04 / 06 · सुरक्षित',
    'Standard dry steel containers for cargo, export and general use. New and used, inspected before dispatch.':'माल, एक्सपोर्ट और सामान्य उपयोग के लिए स्टैंडर्ड ड्राई स्टील कंटेनर। नए और पुराने, भेजने से पहले जाँचे हुए।',
    'New & used':'नए और पुराने',
    'Insulated, wired and furnished cabins with windows, doors and AC points. Ready for site offices, sales offices and guard rooms.':'खिड़कियों, दरवाज़ों और AC पॉइंट वाले इंसुलेटेड, वायरिंग और फ़र्नीचर सहित केबिन। साइट ऑफिस, सेल्स ऑफिस और गार्ड रूम के लिए तैयार।',
    'Electrics':'बिजली फ़िटिंग',
    'Cafés, shops, homes and washrooms, cut, framed, insulated, plumbed and finished to your layout and brand.':'कैफ़े, दुकानें, घर और वॉशरूम, आपके लेआउट और ब्रांड के अनुसार काटकर, फ़्रेम, इंसुलेशन, प्लंबिंग और फ़िनिश के साथ तैयार।',
    'Lockable, wind- and watertight storage on your site for stock, tools, equipment and records.':'आपकी साइट पर स्टॉक, औज़ार, उपकरण और रिकॉर्ड के लिए ताला लगने वाला, हवा और पानी रोधी स्टोरेज।',
    'Weather-tight':'मौसम-रोधी',
    'Temperature-controlled reefers for food, pharma and other perishables, chilled or frozen.':'खाने, दवाओं और जल्दी ख़राब होने वाले सामान के लिए तापमान-नियंत्रित रीफ़र, ठंडा या फ़्रोज़न।',
    'Plug-in power':'प्लग-इन बिजली',
    'Open top and flat rack containers for oversized, tall and heavy cargo like machinery, steel and timber.':'मशीनरी, स्टील और लकड़ी जैसे बड़े, ऊँचे और भारी माल के लिए ओपन टॉप और फ़्लैट रैक कंटेनर।',
    'Custom':'कस्टम','Skip ↓':'आगे बढ़ें ↓','/ Services':'/ सेवाएँ','Build.':'बनवाएँ।','Deliver.':'डिलीवरी।',
    'One team from first message to the container set down on your site.':'पहले मैसेज से लेकर साइट पर कंटेनर रखने तक, एक ही टीम।',
    'New and used containers to own outright, in every standard size. Each unit inspected before it leaves.':'हर स्टैंडर्ड साइज़ में नए और पुराने कंटेनर, पूरी तरह आपके। हर कंटेनर भेजने से पहले जाँचा जाता है।',
    'Cut-outs, doors and windows, insulation, electrics, plumbing, interiors and paint, built to your plan.':'कट-आउट, दरवाज़े-खिड़कियाँ, इंसुलेशन, बिजली, प्लंबिंग, इंटीरियर और पेंट, आपके प्लान के अनुसार।',
    'Transported anywhere in India and placed on your site on your date, ready to use from day one.':'पूरे भारत में कहीं भी पहुँचाकर आपकी तारीख़ पर साइट पर रखा जाता है, पहले दिन से इस्तेमाल के लिए तैयार।',
    '/ Size guide':'/ साइज़ गाइड','Drawn':'सही','to scale.':'अनुपात में।',
    'All three standard sizes on the same scale. Switch sizes to redraw the plan.':'तीनों स्टैंडर्ड साइज़ एक ही अनुपात में। साइज़ बदलें और ड्रॉइंग दोबारा बनती देखें।',
    '20 ft standard':'20 ft स्टैंडर्ड','40 ft standard':'40 ft स्टैंडर्ड',
    'The most popular size. Site offices, kiosks, small storage and single-room fit-outs.':'सबसे लोकप्रिय साइज़। साइट ऑफिस, कियोस्क, छोटा स्टोरेज और एक कमरे के फ़िट-आउट।',
    'Twice the floor area. Bulk storage, larger offices and long cargo.':'दोगुना फ़र्श क्षेत्र। बड़ा स्टोरेज, बड़े ऑफिस और लंबा माल।',
    'One foot taller. The favourite for homes, cafés and fit-outs that need headroom.':'एक फ़ुट ज़्यादा ऊँचा। घर, कैफ़े और ऊँचाई चाहने वाले फ़िट-आउट के लिए सबसे पसंदीदा।',
    'Typical ISO figures. Exact specs vary by manufacturer and condition. We confirm for your unit.':'सामान्य ISO आँकड़े। सही माप निर्माता और हालत के अनुसार बदलते हैं। आपके कंटेनर के लिए हम पुष्टि करेंगे।',
    '/ Process':'/ प्रक्रिया','Four':'साइट तक','steps':'चार','to site.':'क़दम।','Simple from the first message.':'पहले मैसेज से ही आसान।',
    'WhatsApp or call with type, size, any custom work, and your site location.':'प्रकार, साइज़, कोई कस्टम काम और साइट की लोकेशन के साथ WhatsApp या कॉल करें।',
    'Quote':'कोटेशन','We recommend the right unit and send a clear price with delivery included.':'हम सही कंटेनर सुझाते हैं और डिलीवरी सहित साफ़ कीमत भेजते हैं।',
    'Your container is inspected or fitted out to plan, and dispatch is scheduled.':'आपका कंटेनर जाँचा जाता है या प्लान के अनुसार तैयार किया जाता है, और भेजने की तारीख़ तय होती है।',
    'It arrives on site and is placed where you need it, ready to use.':'यह साइट पर पहुँचकर जहाँ चाहिए वहाँ रखा जाता है, इस्तेमाल के लिए तैयार।',
    '/ Why Shivaak':'/ शिवाक क्यों',"Spec'd":'काम के','for':'लिए','the job.':'तैयार।',
    'The reasons customers come to us, written like a spec sheet.':'ग्राहक हमारे पास क्यों आते हैं, स्पेक शीट की तरह।',
    'Every container, one supplier':'हर कंटेनर, एक सप्लायर','Shipping, office, storage, reefer, custom and special units from a single source.':'शिपिंग, ऑफिस, स्टोरेज, रीफ़र, कस्टम और स्पेशल कंटेनर एक ही जगह से।',
    'Buy or customise':'ख़रीदें या कस्टमाइज़ करवाएँ','Buy a new or used container ready to use, or have it built to your plan and budget.':'इस्तेमाल के लिए तैयार नया या पुराना कंटेनर ख़रीदें, या अपने प्लान और बजट के अनुसार बनवाएँ।',
    'Fabrication to your plan':'आपके प्लान के अनुसार फ़ैब्रिकेशन','Cafés, shops, homes and washrooms built to your layout and finish.':'आपके लेआउट और फ़िनिश के अनुसार बने कैफ़े, दुकानें, घर और वॉशरूम।',
    'Delivered and placed':'डिलीवरी और सही जगह पर',"Transport and placement arranged, so you don't have to juggle trucks.":'ट्रांसपोर्ट और रखने का इंतज़ाम हमारा, आपको ट्रकों की भागदौड़ नहीं।',
    'Inspected before dispatch':'भेजने से पहले जाँच','Structure, doors, floor and weather-tightness checked on every unit.':'हर कंटेनर का ढाँचा, दरवाज़े, फ़र्श और मौसम-रोधी होना जाँचा जाता है।',
    'Direct, quick replies':'सीधे और जल्दी जवाब','WhatsApp or call and speak to the team directly.':'WhatsApp या कॉल करें और सीधे टीम से बात करें।',
    '/ FAQ':'/ सवाल-जवाब','Asked':'अक्सर','often.':'पूछे गए।',
    'Yes. Used units are great value for storage and site use. New units suit fit-outs and premium builds. Every container is inspected before dispatch.':'हाँ। स्टोरेज और साइट के काम के लिए पुराने कंटेनर किफ़ायती हैं। फ़िट-आउट और प्रीमियम निर्माण के लिए नए कंटेनर बेहतर हैं। हर कंटेनर भेजने से पहले जाँचा जाता है।',
    'What can be built from a container?':'कंटेनर से क्या-क्या बन सकता है?',
    'Cafés, shops, kiosks, offices, homes, washrooms, security cabins and more, with doors, windows, insulation, electrics, plumbing, interiors and paint.':'कैफ़े, दुकानें, कियोस्क, ऑफिस, घर, वॉशरूम, सिक्योरिटी केबिन और भी बहुत कुछ, दरवाज़े, खिड़कियाँ, इंसुलेशन, बिजली, प्लंबिंग, इंटीरियर और पेंट के साथ।',
    'A high cube is about 30 cm (1 ft) taller than standard, at 2.90 m external height. That extra headroom matters for homes, cafés and tall cargo.':'हाई क्यूब, स्टैंडर्ड से लगभग 30 cm (1 ft) ऊँचा होता है, बाहरी ऊँचाई 2.90 m। घर, कैफ़े और ऊँचे माल के लिए यह अतिरिक्त ऊँचाई काम आती है।',
    'Yes. We arrange transport and place the container at your site. Share your location and access details and delivery will be included in the quote.':'हाँ। हम ट्रांसपोर्ट का इंतज़ाम करते हैं और कंटेनर आपकी साइट पर रखते हैं। अपनी लोकेशन और रास्ते की जानकारी भेजें, डिलीवरी कोटेशन में शामिल होगी।',
    'How should I prepare my site?':'अपनी साइट कैसे तैयार करूँ?',
    "A firm, level base (compacted ground, blocks or a slab) and clear access for the truck to unload. We'll advise based on your site.":'मज़बूत और समतल ज़मीन (दबाई हुई मिट्टी, ब्लॉक या स्लैब) और ट्रक के उतारने के लिए खुला रास्ता। आपकी साइट देखकर हम सलाह देंगे।',
    'Fill in the work order below. It opens WhatsApp with your enquiry filled in. Or call +91 99584 46787.':'नीचे दिया वर्क ऑर्डर भरें। इससे WhatsApp आपकी पूछताछ के साथ खुल जाएगा। या कॉल करें +91 99584 46787।',
    '/ Clients':'/ हमारे ग्राहक','Start':'अपना','your':'निर्माण','bp:build.':'शुरू करें।',
    'Buy. Build.':'ख़रीदें। बनवाएँ।',"Spec'd for":'काम के लिए','Start your':'अपना निर्माण','bp:Four steps':'साइट तक','bp:to site.':'चार क़दम में।',
    'Fill in the work order and tap send. WhatsApp opens with your enquiry ready, and we reply with options and a price.':'वर्क ऑर्डर भरें और भेजें दबाएँ। WhatsApp आपकी पूछताछ के साथ खुल जाएगा, और हम विकल्पों व कीमत के साथ जवाब देंगे।',
    /* placeholders */
    'PH:e.g. Gurugram, Sector 48':'जैसे गुरुग्राम, सेक्टर 48','PH:Timeline, use, fit-out ideas…':'समय, उपयोग, फ़िट-आउट के विचार…','PH:City, area':'शहर, इलाका','PH:Timeline, use, fit-out ideas (optional)':'समय, उपयोग, फ़िट-आउट के विचार (वैकल्पिक)',
    /* finder */
    'Container finder':'कंटेनर फ़ाइंडर','CONTAINER FINDER':'कंटेनर फ़ाइंडर','/ Container finder':'/ कंटेनर फ़ाइंडर','Not sure':'पक्का नहीं','what you need?':'क्या चाहिए?','Not sure what':'पक्का नहीं क्या','you need?':'चाहिए?',
    'Answer three quick questions and we\'ll suggest the right container. Send it to us on WhatsApp in one tap.':'तीन आसान सवालों के जवाब दें, हम सही कंटेनर सुझाएँगे। एक टैप में WhatsApp पर भेजें।',
    'What will you use it for?':'आप इसका क्या उपयोग करेंगे?','How much space?':'कितनी जगह चाहिए?','When do you need it?':'आपको कब चाहिए?',
    'Site office':'साइट ऑफिस','Café / shop':'कैफ़े / दुकान','Home':'घर','Shipping cargo':'माल भेजना',
    'Small (1 room)':'छोटा (1 कमरा)','Large (2 rooms or more)':'बड़ा (2 या ज़्यादा कमरे)','This week':'इसी हफ़्ते','This month':'इसी महीने','Just planning':'अभी योजना बना रहे हैं',
    'Our suggestion':'हमारा सुझाव','Ask about this on WhatsApp':'WhatsApp पर इसके बारे में पूछें','Fill the quote form':'कोटेशन फ़ॉर्म में भरें',
    '20 ft storage container':'20 ft स्टोरेज कंटेनर','40 ft storage container':'40 ft स्टोरेज कंटेनर','20 ft site office':'20 ft साइट ऑफिस','40 ft site office':'40 ft साइट ऑफिस',
    '20 ft café or shop':'20 ft कैफ़े या दुकान','40 ft high cube café':'40 ft हाई क्यूब कैफ़े','40 ft high cube home':'40 ft हाई क्यूब घर','Two joined 40 ft high cubes':'दो जुड़े हुए 40 ft हाई क्यूब',
    '20 ft shipping container':'20 ft शिपिंग कंटेनर','40 ft high cube shipping container':'40 ft हाई क्यूब शिपिंग कंटेनर',
    'Lockable and weather-tight. Fits about a one-room load of stock or tools.':'ताला लगने वाला और मौसम-रोधी। लगभग एक कमरे जितना स्टॉक या औज़ार आ जाते हैं।',
    'Double the floor space for bulk stock, furniture or equipment.':'बड़े स्टॉक, फ़र्नीचर या उपकरण के लिए दोगुनी जगह।',
    'Insulated cabin with a desk, lights and AC point for 2 to 3 people.':'2 से 3 लोगों के लिए डेस्क, लाइट और AC पॉइंट वाला इंसुलेटेड केबिन।',
    'Room for an office and a meeting area, or two separate cabins.':'एक ऑफिस और मीटिंग की जगह, या दो अलग केबिन।',
    'Serving hatch, counter and branding. A good fit for one counter.':'सर्विंग खिड़की, काउंटर और ब्रांडिंग। एक काउंटर के लिए बढ़िया।',
    'Extra headroom and length for seating, a kitchen and a counter.':'बैठने, किचन और काउंटर के लिए ज़्यादा ऊँचाई और लंबाई।',
    'The usual starting point for a container home: a bedroom, kitchen and bathroom in one unit.':'कंटेनर घर की सामान्य शुरुआत: एक ही कंटेनर में बेडरूम, किचन और बाथरूम।',
    'Joined side by side for a two-bedroom home.':'दो बेडरूम के घर के लिए साथ-साथ जोड़े गए।',
    'Cargo-worthy and certified wind and water tight. Best for heavy, dense cargo.':'माल ढुलाई योग्य, हवा और पानी रोधी प्रमाणित। भारी माल के लिए सबसे अच्छा।',
    'Best for large, light cargo. About 76 m³ of space.':'बड़े और हल्के माल के लिए सबसे अच्छा। लगभग 76 m³ जगह।',
    /* fits */
    'What fits inside':'अंदर कितना आएगा','Pick a container and a pallet type to see how many pallets fit on the floor, drawn to scale.':'कंटेनर और पैलेट चुनें और देखें कि फ़र्श पर कितने पैलेट आते हैं, सही अनुपात में।',
    'Container':'कंटेनर','Pallet':'पैलेट','40 ft / 40 ft HC':'40 ft / 40 ft HC','Standard 1.2 × 1.0 m':'स्टैंडर्ड 1.2 × 1.0 m','Euro 1.2 × 0.8 m':'यूरो 1.2 × 0.8 m',
    'Pallets, one layer':'पैलेट, एक परत','Internal floor':'अंदरूनी फ़र्श',
    'Tight single-layer fit on the internal floor (20 ft: 5.90 × 2.35 m, 40 ft: 12.03 × 2.35 m). Real loads often take one or two fewer, depending on how the pallets are loaded.':'अंदरूनी फ़र्श पर एक परत में अधिकतम संख्या (20 ft: 5.90 × 2.35 m, 40 ft: 12.03 × 2.35 m)। लोडिंग के तरीक़े के अनुसार असल में एक-दो कम आ सकते हैं।',
    /* phone bar */
    'Call':'कॉल'
  };
  function tr(s){
    var k=s.replace(/\s+/g,' ').trim(); if(!k)return null;
    if(Object.prototype.hasOwnProperty.call(HI,PAGE+':'+k))return HI[PAGE+':'+k];
    return Object.prototype.hasOwnProperty.call(HI,k)?HI[k]:null;
  }
  function translate(root){
    if(lang!=='hi'||!root)return;
    if(root.nodeType===3){var v=tr(root.nodeValue);if(v!==null)root.nodeValue=root.nodeValue.replace(root.nodeValue.trim(),v);return}
    if(root.nodeType!==1||root.closest&&root.closest('script,style,[data-no-i18n]'))return;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return n.parentElement&&n.parentElement.closest('script,style,[data-no-i18n]')?2:1}});
    var list=[],n;while((n=w.nextNode()))list.push(n);
    list.forEach(function(t){
      var p=t.parentElement;
      if(p&&p.tagName==='OPTION'&&!p.hasAttribute('value'))p.setAttribute('value',p.textContent.trim()); // keep English values for the WhatsApp message
      var v=tr(t.nodeValue);if(v!==null)t.nodeValue=t.nodeValue.replace(t.nodeValue.trim(),v);
    });
    (root.querySelectorAll?[root].concat([].slice.call(root.querySelectorAll('[placeholder]'))):[]).forEach(function(e){
      if(!e.getAttribute||!e.getAttribute('placeholder'))return;var v=tr('PH:'+e.getAttribute('placeholder'));if(v!==null)e.setAttribute('placeholder',v);
    });
  }

  /* ---------- per-page heading markup so new sections look native ---------- */
  function head(label, h, p){
    if(PAGE==='bp')return '<div class="sh"><span class="tag"><b>00</b> / '+label+'</span><h2 class="x">'+h+'</h2><p>'+p+'</p></div>';
    return '<div class="sec-head"><div><span class="sec-num">'+label.toUpperCase()+'</span><h2>'+h+'</h2></div><p>'+p+'</p></div>';
  }
  var ICON_WA='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 5-1.3A9.8 9.8 0 1 0 12 2.2zm5.4 13.6c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.9-4.6-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1z"/></svg>';

  function group(name, opts){
    return '<div class="x-opts" role="group" data-x="'+name+'">'+opts.map(function(o,i){return '<button class="x-opt" type="button" aria-pressed="'+(i===0)+'" data-v="'+o[0]+'">'+o[1]+'</button>'}).join('')+'</div>';
  }
  function wireGroup(el, cb){
    var b=[].slice.call(el.querySelectorAll('.x-opt'));
    b.forEach(function(x){x.addEventListener('click',function(){b.forEach(function(y){y.setAttribute('aria-pressed',y===x)});cb()})});
  }
  var val=function(el){return el.querySelector('[aria-pressed="true"]').getAttribute('data-v')};

  /* ---------- 1. container finder ---------- */
  var fslot=document.getElementById('finder-slot');
  if(fslot){
    fslot.outerHTML='<section class="x-sec" id="finder"><div class="x-in">'+
      head('Container finder','Not sure<br>what you need?',"Answer three quick questions and we'll suggest the right container. Send it to us on WhatsApp in one tap.")+
      '<div class="x-finder"><div class="x-qs">'+
        '<div><p class="x-label">What will you use it for?</p>'+group('use',[['storage','Storage'],['office','Site office'],['shop','Café / shop'],['home','Home'],['cargo','Shipping cargo']])+'</div>'+
        '<div><p class="x-label">How much space?</p>'+group('space',[['small','Small (1 room)'],['large','Large (2 rooms or more)']])+'</div>'+
        '<div><p class="x-label">When do you need it?</p>'+group('when',[['This week','This week'],['This month','This month'],['Just planning','Just planning']])+'</div>'+
      '</div><div class="x-result" aria-live="polite"><p class="x-label">Our suggestion</p><svg id="xRecArt" viewBox="0 0 260 110" aria-hidden="true"></svg><h3 id="xRecName"></h3><p id="xRecWhy"></p>'+
        '<div class="x-actions"><a class="x-btn x-wa" id="xRecWa" href="#" target="_blank" rel="noopener">'+ICON_WA+'<span>Ask about this on WhatsApp</span></a><button type="button" class="x-btn ghost" id="xRecForm">Fill the quote form</button></div>'+
      '</div></div></div></section>';
    var REC={
      storage:{small:['20 ft storage container','Lockable and weather-tight. Fits about a one-room load of stock or tools.','#6f7a82',1,'Storage container','20 ft',1],large:['40 ft storage container','Double the floor space for bulk stock, furniture or equipment.','#6f7a82',2,'Storage container','40 ft',1]},
      office:{small:['20 ft site office','Insulated cabin with a desk, lights and AC point for 2 to 3 people.','#2f7d4f',1,'Office container','20 ft',1],large:['40 ft site office','Room for an office and a meeting area, or two separate cabins.','#2f7d4f',2,'Office container','40 ft',1]},
      shop:{small:['20 ft café or shop','Serving hatch, counter and branding. A good fit for one counter.','#ff6a13',1,'Custom-built (café / shop / home / washroom)','20 ft',1],large:['40 ft high cube café','Extra headroom and length for seating, a kitchen and a counter.','#ff6a13',2,'Custom-built (café / shop / home / washroom)','40 ft high cube',1]},
      home:{small:['40 ft high cube home','The usual starting point for a container home: a bedroom, kitchen and bathroom in one unit.','#c9a227',2,'Custom-built (café / shop / home / washroom)','40 ft high cube',1],large:['Two joined 40 ft high cubes','Joined side by side for a two-bedroom home.','#c9a227',2,'Custom-built (café / shop / home / washroom)','40 ft high cube',2]},
      cargo:{small:['20 ft shipping container','Cargo-worthy and certified wind and water tight. Best for heavy, dense cargo.','#1d5fa8',1,'Shipping container','20 ft',1],large:['40 ft high cube shipping container','Best for large, light cargo. About 76 m³ of space.','#1d5fa8',2,'Shipping container','40 ft high cube',1]}
    };
    var gU=document.querySelector('[data-x="use"]'),gS=document.querySelector('[data-x="space"]'),gW=document.querySelector('[data-x="when"]');
    var cur=null;
    var finder=function(){
      var r=REC[val(gU)][val(gS)];cur=r;
      document.getElementById('xRecName').textContent=r[0];
      document.getElementById('xRecWhy').textContent=r[1];
      var w=r[3]===1?120:240,x=(260-w)/2,two=r[6]===2,s='';
      var rows=two?[[8,44],[54,44]]:[[30,62]];
      rows.forEach(function(rw,i){s+='<rect x="'+x+'" y="'+rw[0]+'" width="'+w+'" height="'+rw[1]+'" fill="'+r[2]+'" opacity="'+(i?0.85:1)+'"/>';for(var k=x+5;k<x+w-3;k+=7)s+='<rect x="'+k+'" y="'+rw[0]+'" width="3" height="'+rw[1]+'" fill="rgba(0,0,0,.18)"/>'});
      s+='<rect x="0" y="100" width="260" height="2" fill="currentColor" opacity=".3"/>';
      document.getElementById('xRecArt').innerHTML=s;
      var msg='Hi Shivaak Enterprises, I\'d like a quote for: '+r[0]+'. Needed: '+val(gW).toLowerCase()+'.';
      document.getElementById('xRecWa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    };
    [gU,gS,gW].forEach(function(g){wireGroup(g,finder)});finder();
    document.getElementById('xRecForm').addEventListener('click',function(){
      var f=document.getElementById('qf');if(!f||!cur)return;
      var set=function(name,v){var el=f.querySelector('[name="'+name+'"]');if(el)el.value=v};
      set('type',cur[4]);set('size',cur[5]);set('qty',cur[6]);
      var need=f.querySelector('input[name="need"][value="'+(val(gU)==='shop'||val(gU)==='home'?'Customise':'Buy')+'"]');if(need)need.checked=true;
      var msg=f.querySelector('[name="msg"]');if(msg&&!msg.value)msg.value='Needed: '+val(gW).toLowerCase()+'.';
      var tgt=document.getElementById('quote');
      if(window.__shvkLenis)window.__shvkLenis.scrollTo(tgt,{duration:1.4});else tgt.scrollIntoView({behavior:'smooth'});
    });
  }

  /* ---------- 2. what fits inside ---------- */
  var pslot=document.getElementById('fits-slot');
  if(pslot){
    pslot.outerHTML='<div class="x-fits" id="fits"><h3>What fits inside</h3><p>Pick a container and a pallet type to see how many pallets fit on the floor, drawn to scale.</p>'+
      '<div class="x-fit-ctrl"><div><p class="x-label">Container</p>'+group('box',[['20','20 ft'],['40','40 ft / 40 ft HC']])+'</div><div><p class="x-label">Pallet</p>'+group('pal',[['std','Standard 1.2 × 1.0 m'],['euro','Euro 1.2 × 0.8 m']])+'</div></div>'+
      '<div class="x-fit-stage"><svg id="xFitSvg" viewBox="0 0 1240 330" role="img" aria-label="Top view of the container floor with pallets placed"></svg></div>'+
      '<div class="x-fit-read"><div><b id="xFitN"></b><span>Pallets, one layer</span></div><div><b id="xFitFloor"></b><span>Internal floor</span></div></div>'+
      '<p class="x-fine">Tight single-layer fit on the internal floor (20 ft: 5.90 × 2.35 m, 40 ft: 12.03 × 2.35 m). Real loads often take one or two fewer, depending on how the pallets are loaded.</p></div>';
    var BOX={'20':{L:5.90,label:'20 FT'},'40':{L:12.03,label:'40 FT'}},W=2.35,PAL={std:[1.2,1.0],euro:[1.2,0.8]};
    var layout=function(L,p){
      var d=PAL[p],sides=[[d[0],d[1]],[d[1],d[0]]],best={n:-1,lanes:[]};
      (function walk(used,lanes){
        var n=lanes.reduce(function(t,ln){return t+Math.floor(L/ln[1]+1e-9)},0);
        if(n>best.n)best={n:n,lanes:lanes.slice()};
        if(lanes.length>=3)return;
        sides.forEach(function(sd){if(used+sd[0]<=W+1e-9)walk(used+sd[0],lanes.concat([sd]))});
      })(0,[]);
      var out=[],y=0;best.lanes.forEach(function(ln){var k=Math.floor(L/ln[1]+1e-9);for(var i=0;i<k;i++)out.push([i*ln[1],y,ln[1],ln[0]]);y+=ln[0]});
      return out;
    };
    var gB=document.querySelector('[data-x="box"]'),gP=document.querySelector('[data-x="pal"]'),svg=document.getElementById('xFitSvg');
    var cs=getComputedStyle(document.documentElement);
    var drawFit=function(){
      var b=BOX[val(gB)],pals=layout(b.L,val(gP)),sc=1180/12.03,x0=30,y0=40,acc=cs.getPropertyValue('--x-accent').trim()||'#ff6a13',mut=cs.getPropertyValue('--x-muted').trim()||'#9aa3ab';
      var s='<text x="'+x0+'" y="24" font-family="monospace" font-size="16" fill="'+mut+'">'+b.label+' · TOP VIEW</text>';
      s+='<rect x="'+x0+'" y="'+y0+'" width="'+(b.L*sc)+'" height="'+(W*sc)+'" fill="none" stroke="'+acc+'" stroke-width="3"/>';
      pals.forEach(function(r){var px=x0+r[0]*sc+3,py=y0+r[1]*sc+3,pw=r[2]*sc-6,ph=r[3]*sc-6;
        s+='<rect x="'+px+'" y="'+py+'" width="'+pw+'" height="'+ph+'" fill="#c9a46a"/><path d="M'+px+' '+(py+ph/2)+'h'+pw+'M'+(px+pw/2)+' '+py+'v'+ph+'" stroke="rgba(0,0,0,.25)" stroke-width="2"/>'});
      s+='<path d="M'+x0+' '+(y0+W*sc+22)+'h'+(b.L*sc)+'M'+x0+' '+(y0+W*sc+12)+'v20M'+(x0+b.L*sc)+' '+(y0+W*sc+12)+'v20" stroke="'+acc+'" stroke-width="2"/>';
      s+='<text x="'+(x0+b.L*sc/2-36)+'" y="'+(y0+W*sc+48)+'" font-family="monospace" font-size="18" fill="'+acc+'">'+b.L.toFixed(2)+' M</text>';
      svg.innerHTML=s;svg.setAttribute('viewBox','0 0 '+Math.max(620,x0*2+b.L*sc)+' 330');
      document.getElementById('xFitN').textContent=pals.length;
      document.getElementById('xFitFloor').textContent=(b.L*W).toFixed(1)+' m²';
    };
    wireGroup(gB,drawFit);wireGroup(gP,drawFit);drawFit();
  }

  /* ---------- 3. language switch in the header ---------- */
  var burger=document.getElementById('burger');
  if(burger){
    var a=document.createElement('a');
    a.className='x-lang';a.setAttribute('data-no-i18n','');
    var to=lang==='hi'?'en':'hi';
    a.href='?lang='+to;a.lang=to;a.textContent=to==='hi'?'हिंदी':'English';
    a.setAttribute('aria-label',to==='hi'?'हिंदी में देखें':'View in English');
    a.addEventListener('click',function(e){e.preventDefault();try{localStorage.setItem('shvk-lang',to)}catch(err){}var u=new URL(location.href);u.searchParams.set('lang',to);location.href=u.toString()});
    // keep the header's spacing: group the switch with the existing quote button
    var cta=burger.parentNode.querySelector(':scope > a.btn');
    var grp=document.createElement('div');grp.className='x-nav-right';
    if(cta){cta.parentNode.insertBefore(grp,cta);grp.appendChild(cta)}else burger.parentNode.insertBefore(grp,burger);
    grp.appendChild(a);
  }

  /* ---------- 4. phone action bar ---------- */
  var bar=document.createElement('nav');
  bar.className='x-bar';bar.setAttribute('aria-label','Quick actions');
  bar.innerHTML='<a href="tel:+919958446787"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><span>Call</span></a>'+
    '<a class="x-wa" href="https://wa.me/'+WA+'?text='+encodeURIComponent("Hi Shivaak Enterprises, I'd like a container quote.")+'" target="_blank" rel="noopener">'+ICON_WA+'<span>WhatsApp</span></a>'+
    '<a class="x-q" href="#quote"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg><span>Quote</span></a>';
  document.body.appendChild(bar);

  /* ---------- apply Hindi now, and to anything the page adds later ---------- */
  if(lang==='hi'){
    document.documentElement.lang='hi';
    translate(document.body);
    var title=tr(document.title);if(title)document.title=title;
    new MutationObserver(function(ms){ms.forEach(function(m){
      if(m.type==='characterData')translate(m.target);
      else m.addedNodes.forEach(function(n){translate(n)});
    })}).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
})();
