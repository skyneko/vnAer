import request from "request"

const post_URL: string = "http://spirit.vietnamairlines.com/vi/tintuc/van-hoa-the-thao-82/vnaerathome-sat-canh-chung-tay---danh-bay-covid-19-7024.html"
const likeNum: number = 10000

// --- chi chinh sua cai tren nay -- // 

const LIKE_ENDPOINT = "http://spirit.vietnamairlines.com/api/apilike.ashx?func=updatelike&random=0.9187890161905795"
const VIEW_ENDPOINT = "http://spirit.vietnamairlines.com/api/apilike.ashx?func=updateview&random=0.7185810243591274"

let requestCout: number = 0

function main (postUrl: string): void {
    if ((requestCout % 5) === 0) console.log(requestCout)

    // like 
    like(postUrl).then ((status) => {
        if (++requestCout < likeNum && status === "SUCCESS") 
            main(postUrl)
        else {
            if (status === "ERR") {
                console.log("Request ERROR!")
                main(postUrl)
            }    
            else {
                console.log("done.")
            }    
        }
    })
}

/**
 * Trả về một chuỗi ngẫu nhiên
 * @length độ dài chuỗi ký tự trả về.
 */
function createRandomString(length: number): string {
   let result: string = ''
   const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
   }

   return result
}

/**
 * Trả về request header
 */
function createHeader(): request.Headers {
    return {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data; boundary=---------------------------69510292116216458401446075174',
        'Origin': 'http://spirit.vietnamairlines.com',
        'Connection': 'keep-alive',
        'Cookie': 'ASP.NET_SessionId=' + createRandomString(27)
    }
}

/**
 * Like post.
 */
type status = "SUCCESS" | "ERR"

function like (postUrl: string): Promise<status> {

    // remove domain & parameter
    postUrl = postUrl.slice("http://spirit.vietnamairlines.com".length, postUrl.length)
    
    if (postUrl.indexOf("?") > -1) 
        postUrl = postUrl.slice(0, postUrl.indexOf("?"))

    const query: string = Buffer.from(JSON.stringify({
        Url : postUrl
    })).toString("base64")

    const form: string = "-----------------------------69510292116216458401446075174\nContent-Disposition: form-data; name=data\n\n"+query+"\n-----------------------------69510292116216458401446075174--\n"

    const requestOptionsLIKE: request.Options = {
        uri: LIKE_ENDPOINT,
        method: "POST",
        headers: createHeader(),
        body: form
    } 

    const requestOptionsVIEW: request.Options = {
        uri: VIEW_ENDPOINT,
        method: "POST",
        headers: createHeader(),
        body: form
    } 

    
    return new Promise ((resolve) => {

        // view 
        request(requestOptionsVIEW)

        // like 
        request(requestOptionsLIKE, (err: Error, res: request.RequestResponse, body: string) : void => {
            if (err) return console.log(err)

            const result = JSON.parse(body)

            if (result.status === "SUCCESS") 
                if (result.data.length === 0) 
                    return console.log("Không tìm thầy bài viết.", "url: " + post_URL)
            
            resolve(result.status)
        })
    })

}


main(post_URL)