const staticCacheName = "version-1" //기본값 정의하는 캐시
const dynamicCache = "dynamicCache"; //다른 캐시들은 다이나믹 캐시쪽으로 쌓임
const urlsToCache = [//기본값 캐시
    "/pj2/index.html",
    '/pj2/static/js/bundle.js',//인터넷이 안돼도 이녀석이 무조건 필요하기 때문에 정의해줌
    '/pj2/manifest.json'
]

const limitCacheSize = (name, size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name,size))
            }
        })
    })
}

//인스톨 이벤트가 발생하면 캐시 오픈! 
this.addEventListener('install', (event)=>{
    event.waitUntil( // 여기 들어있는 애들이 다 된 후 activate 애들이 동작된다 
        caches.open(staticCacheName).then((cache)=>{ //version-1
            
            return cache.addAll(urlsToCache); //cache version-1이라는 공간에 넣어주자~~~ 
        })
    )
})

this.addEventListener('fetch', event => {
    
    event.respondWith(
        caches.match(event.request).then(cacheRes=>{
            return cacheRes || fetch(event.request).then(fetchRes=>{ //인터넷이 됐을 경우
                return caches.open(dynamicCache).then(cache => { //캐시를 다시 오픈한다! 
                    cache.put(event.request.url, fetchRes.clone()); //daynamicCache오픈 후 웹에서 들어오는 내용을 push 중
                    limitCacheSize(dynamicCache,10);
                    return fetchRes;
                })
            })
        }).catch(()=>{
            if(event.request.url.indexOf('.html') > -1){
                return caches.match('/fallback.html')    
            }            
        })
    )
})

this.addEventListener('activate', event=>{  
    
    event.waitUntil( // 이 작업이 끝나고 난 후 fetch이벤트가 발생하도록
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key=> key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})