"use strict";
const fs = require("fs");
const puppeteer = require("puppeteer");
const Item = require("./models/items");
const {Client} = require("@googlemaps/google-maps-services-js");
/**
 * 
 *name: 2nd div with class xkh6y0r
All element s with class x1n2onr6 
price: All element s with class x1s688f 
location: All element s with class xuxw1ft 
img: All element s with classes xh8yej3 , x1ja2u2z
All img s 
url:  $e.parentProp("href")
 */
//x9f619 x78zum5 xdt5ytf x1qughib x1rdy4ex xz9dl7a xsag5q8 xh8yej3 xp0eagm x1nrcals
//span class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft" location
//span price class="x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x1lkfr7t x1lbecb7 x1s688f xzsf02u"
//span name class=x1lliihq x6ikm8r x10wlt62 x1n2onr6



async function run(searchTerm, location) {
    const sites = {
        "facebook": `https://www.facebook.com/marketplace/${location}/search/?query`,
      
    };
    // "offerup": "https://offerup.com/search?q",
    // "craigslist": ""

    for (const site in sites) {
        ///launches new instance of headless browser
        const browser = await puppeteer.launch({ headless: false });
        //creates new page object 
        const page = await browser.newPage();
        
        let url = `${sites[site]}=${encodeURIComponent(searchTerm)}`;

        //navigate to target url
        await page.goto(url);
        // const marketplaceSelector = "div.x8gbvx8.x78zum5.x1q0g3np.x1a02dak.x1nhvcw1.x1rdy4ex.xcud41i.x4vbgl9.x139jcc6";
        const marketplaceSelector= "div.x9f619.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xs83m0k.x1e558r4.x150jy0e.x1iorvi4.xjkvuk6.xnpuxes.x291uyu.x1uepa24";
        await page.waitForSelector(marketplaceSelector);
        console.log("could it find it?");

        //calls function passing page and desired itemcount
        //x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g x1lku1pv
        const items = await page.evaluate((marketplaceSelector)=>{
            const marketplaceElements = document.querySelectorAll(marketplaceSelector);
            const itemsData = [];

            for(let i=0; i<10 && i<marketplaceElements.length; i++){
                const item = marketplaceElements[i];
                const location = item.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft')?.innerText || '';
                const price = item.querySelector('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u')?.innerText || '';
                const name = item.querySelector('span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6')?.innerText || '';
                const imageSrc = item.querySelector('img')?.getAttribute('src') || '';
                const href = item.querySelector('a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.x1lku1pv')?.getAttribute('href') || '';

                itemsData.push({ location, price, name, imageSrc, href });
            }
            return itemsData;
        }, marketplaceSelector);
        console.log(items);


        // fs.writeFileSync("items.json", JSON.stringify(items));

        await browser.close();

    }

}
/**
 * All element s with classes xs83m0k , x1t2pt76
1st div
> All element s with class x1swvt13
All div s
> 1st div
> 1st div
> All element s 
 */

run("leather couch", "la");

//https://www.facebook.com/marketplace/?ref=app_tab

//https://www.facebook.com/marketplace/la/search/?query=leather%20couch
 // Check for new items and add them to the database
        // for (const item of items) {
        //     if (allItems.includes(item)) {
        //         console.log("skipping duplicate: ", item);
        //         continue;
        //     }
        //     try {
        //         const newItem = await Item.create({ item })

        //     } catch (err) {
        //         console.log("duplicate", err);
        //         continue;
        //     }
        // }

        //evaluates height of page and stores in previous height
        // previousHeight = await page.evaluate("document.body.scrollHeight");

        //scrolls to bottom of page
        // await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");

        //waits for page to load new content that checks if scroll height has increased
        // await page.waitForFunction(
        //     `document.body.scrollHeight > ${previousHeight}`
        // );

        //have puputeer wait for specific amount of time before proceeding
        //to next line of code
        // await page.waitForTimeout(1000);

            //selected each div element for each item
            // const divs = divElements.map((divElement)=>{
            //     const innerDiv = divElement.querySelectorAll('div > div > div > span > div > div > a');
               
            // });
            // console.log("divs", divs);

            // const items = Array.from(divs).map((innerDiv)=>{
            //     const general = innerDiv.querySelectorAll('div> div[nth-child[2]]');
            //     const link = innerDiv.href;
            //     const image = inner.querySelectorAll('div > div> div> div > div > div > img').src;
            //     const title = general.querySelectorAll('div[nth-child[2]]> span > div > span ').innerText;
            //     const price = general.querySelectorAll('div > span > div > span').innerText;
            //     return {
            //         title,
            //         link,
            //         image,
            //         price

            //     };
            // })