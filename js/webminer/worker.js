/*! rusha 2018-02-26 */

(function e(t,r){if(typeof exports==="object"&&typeof module==="object")module.exports=r();else if(typeof define==="function"&&define.amd)define([],r);else if(typeof exports==="object")exports["Rusha"]=r();else t["Rusha"]=r()})(typeof self!=="undefined"?self:this,function(){return function(e){var t={};function r(n){if(t[n]){return t[n].exports}var a=t[n]={i:n,l:false,exports:{}};e[n].call(a.exports,a,a.exports,r);a.l=true;return a.exports}r.m=e;r.c=t;r.d=function(e,t,n){if(!r.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:n})}};r.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};r.d(t,"a",t);return t};r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.p="";return r(r.s=3)}([function(e,t,r){function n(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var a=r(5);var i=r(1),o=i.toHex,s=i.ceilHeapSize;var f=r(6);var u=function(e){for(e+=9;e%64>0;e+=1){}return e};var c=function(e,t){var r=new Uint8Array(e.buffer);var n=t%4,a=t-n;switch(n){case 0:r[a+3]=0;case 1:r[a+2]=0;case 2:r[a+1]=0;case 3:r[a+0]=0}for(var i=(t>>2)+1;i<e.length;i++){e[i]=0}};var h=function(e,t,r){e[t>>2]|=128<<24-(t%4<<3);e[((t>>2)+2&~15)+14]=r/(1<<29)|0;e[((t>>2)+2&~15)+15]=r<<3};var p=function(e,t){var r=new Int32Array(e,t+320,5);var n=new Int32Array(5);var a=new DataView(n.buffer);a.setInt32(0,r[0],false);a.setInt32(4,r[1],false);a.setInt32(8,r[2],false);a.setInt32(12,r[3],false);a.setInt32(16,r[4],false);return n};var l=function(){function e(t){n(this,e);t=t||64*1024;if(t%64>0){throw new Error("Chunk size must be a multiple of 128 bit")}this._offset=0;this._maxChunkLen=t;this._padMaxChunkLen=u(t);this._heap=new ArrayBuffer(s(this._padMaxChunkLen+320+20));this._h32=new Int32Array(this._heap);this._h8=new Int8Array(this._heap);this._core=new a({Int32Array:Int32Array},{},this._heap)}e.prototype._initState=function e(t,r){this._offset=0;var n=new Int32Array(t,r+320,5);n[0]=1732584193;n[1]=-271733879;n[2]=-1732584194;n[3]=271733878;n[4]=-1009589776};e.prototype._padChunk=function e(t,r){var n=u(t);var a=new Int32Array(this._heap,0,n>>2);c(a,t);h(a,t,r);return n};e.prototype._write=function e(t,r,n,a){f(t,this._h8,this._h32,r,n,a||0)};e.prototype._coreCall=function e(t,r,n,a,i){var o=n;this._write(t,r,n);if(i){o=this._padChunk(n,a)}this._core.hash(o,this._padMaxChunkLen)};e.prototype.rawDigest=function e(t){var r=t.byteLength||t.length||t.size||0;this._initState(this._heap,this._padMaxChunkLen);var n=0,a=this._maxChunkLen;for(n=0;r>n+a;n+=a){this._coreCall(t,n,a,r,false)}this._coreCall(t,n,r-n,r,true);return p(this._heap,this._padMaxChunkLen)};e.prototype.digest=function e(t){return o(this.rawDigest(t).buffer)};e.prototype.digestFromString=function e(t){return this.digest(t)};e.prototype.digestFromBuffer=function e(t){return this.digest(t)};e.prototype.digestFromArrayBuffer=function e(t){return this.digest(t)};e.prototype.resetState=function e(){this._initState(this._heap,this._padMaxChunkLen);return this};e.prototype.append=function e(t){var r=0;var n=t.byteLength||t.length||t.size||0;var a=this._offset%this._maxChunkLen;var i=void 0;this._offset+=n;while(r<n){i=Math.min(n-r,this._maxChunkLen-a);this._write(t,r,i,a);a+=i;r+=i;if(a===this._maxChunkLen){this._core.hash(this._maxChunkLen,this._padMaxChunkLen);a=0}}return this};e.prototype.getState=function e(){var t=this._offset%this._maxChunkLen;var r=void 0;if(!t){var n=new Int32Array(this._heap,this._padMaxChunkLen+320,5);r=n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}else{r=this._heap.slice(0)}return{offset:this._offset,heap:r}};e.prototype.setState=function e(t){this._offset=t.offset;if(t.heap.byteLength===20){var r=new Int32Array(this._heap,this._padMaxChunkLen+320,5);r.set(new Int32Array(t.heap))}else{this._h32.set(new Int32Array(t.heap))}return this};e.prototype.rawEnd=function e(){var t=this._offset;var r=t%this._maxChunkLen;var n=this._padChunk(r,t);this._core.hash(n,this._padMaxChunkLen);var a=p(this._heap,this._padMaxChunkLen);this._initState(this._heap,this._padMaxChunkLen);return a};e.prototype.end=function e(){return o(this.rawEnd().buffer)};return e}();e.exports=l;e.exports._core=a},function(e,t){var r=new Array(256);for(var n=0;n<256;n++){r[n]=(n<16?"0":"")+n.toString(16)}e.exports.toHex=function(e){var t=new Uint8Array(e);var n=new Array(e.byteLength);for(var a=0;a<n.length;a++){n[a]=r[t[a]]}return n.join("")};e.exports.ceilHeapSize=function(e){var t=0;if(e<=65536)return 65536;if(e<16777216){for(t=1;t<e;t=t<<1){}}else{for(t=16777216;t<e;t+=16777216){}}return t};e.exports.isDedicatedWorkerScope=function(e){var t="WorkerGlobalScope"in e&&e instanceof e.WorkerGlobalScope;var r="SharedWorkerGlobalScope"in e&&e instanceof e.SharedWorkerGlobalScope;var n="ServiceWorkerGlobalScope"in e&&e instanceof e.ServiceWorkerGlobalScope;return t&&!r&&!n}},function(e,t,r){e.exports=function(){var e=r(0);var t=function(e,t,r){try{return r(null,e.digest(t))}catch(e){return r(e)}};var n=function(e,t,r,a,i){var o=new self.FileReader;o.onloadend=function s(){if(o.error){return i(o.error)}var f=o.result;t+=o.result.byteLength;try{e.append(f)}catch(e){i(e);return}if(t<a.size){n(e,t,r,a,i)}else{i(null,e.end())}};o.readAsArrayBuffer(a.slice(t,t+r))};var a=true;self.onmessage=function(r){if(!a){return}var i=r.data.data,o=r.data.file,s=r.data.id;if(typeof s==="undefined")return;if(!o&&!i)return;var f=r.data.blockSize||4*1024*1024;var u=new e(f);u.resetState();var c=function(e,t){if(!e){self.postMessage({id:s,hash:t})}else{self.postMessage({id:s,error:e.name})}};if(i)t(u,i,c);if(o)n(u,0,f,o,c)};return function(){a=false}}},function(e,t,r){var n=r(4);var a=r(0);var i=r(7);var o=r(2);var s=r(1),f=s.isDedicatedWorkerScope;var u=typeof self!=="undefined"&&f(self);a.disableWorkerBehaviour=u?o():function(){};a.createWorker=function(){var e=n(2);var t=e.terminate;e.terminate=function(){URL.revokeObjectURL(e.objectURL);t.call(e)};return e};a.createHash=i;e.exports=a},function(e,t,r){function n(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:false,exports:{}};e[n].call(a.exports,a,a.exports,r);a.l=true;return a.exports}r.m=e;r.c=t;r.i=function(e){return e};r.d=function(e,t,n){if(!r.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:n})}};r.r=function(e){Object.defineProperty(e,"__esModule",{value:true})};r.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};r.d(t,"a",t);return t};r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.p="/";r.oe=function(e){console.error(e);throw e};var n=r(r.s=ENTRY_MODULE);return n.default||n}var a="[\\.|\\-|\\+|\\w|/|@]+";var i="\\((/\\*.*?\\*/)?s?.*?("+a+").*?\\)";function o(e){return(e+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function s(e,t,n){var s={};s[n]=[];var f=t.toString();var u=f.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!u)return s;var c=u[1];var h=new RegExp("(\\\\n|\\W)"+o(c)+i,"g");var p;while(p=h.exec(f)){if(p[3]==="dll-reference")continue;s[n].push(p[3])}h=new RegExp("\\("+o(c)+'\\("(dll-reference\\s('+a+'))"\\)\\)'+i,"g");while(p=h.exec(f)){if(!e[p[2]]){s[n].push(p[1]);e[p[2]]=r(p[1]).m}s[p[2]]=s[p[2]]||[];s[p[2]].push(p[4])}return s}function f(e){var t=Object.keys(e);return t.reduce(function(t,r){return t||e[r].length>0},false)}function u(e,t){var r={main:[t]};var n={main:[]};var a={main:{}};while(f(r)){var i=Object.keys(r);for(var o=0;o<i.length;o++){var u=i[o];var c=r[u];var h=c.pop();a[u]=a[u]||{};if(a[u][h]||!e[u][h])continue;a[u][h]=true;n[u]=n[u]||[];n[u].push(h);var p=s(e,e[u][h],u);var l=Object.keys(p);for(var v=0;v<l.length;v++){r[l[v]]=r[l[v]]||[];r[l[v]]=r[l[v]].concat(p[l[v]])}}}return n}e.exports=function(e,t){t=t||{};var a={main:r.m};var i=t.all?{main:Object.keys(a)}:u(a,e);var o="";Object.keys(i).filter(function(e){return e!=="main"}).forEach(function(e){var t=0;while(i[e][t]){t++}i[e].push(t);a[e][t]="(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })";o=o+"var "+e+" = ("+n.toString().replace("ENTRY_MODULE",JSON.stringify(t))+")({"+i[e].map(function(t){return""+JSON.stringify(t)+": "+a[e][t].toString()}).join(",")+"});\n"});o=o+"("+n.toString().replace("ENTRY_MODULE",JSON.stringify(e))+")({"+i.main.map(function(e){return""+JSON.stringify(e)+": "+a.main[e].toString()}).join(",")+"})(self);";var s=new window.Blob([o],{type:"text/javascript"});if(t.bare){return s}var f=window.URL||window.webkitURL||window.mozURL||window.msURL;var c=f.createObjectURL(s);var h=new window.Worker(c);h.objectURL=c;return h}},function(e,t){e.exports=function e(t,r,n){"use asm";var a=new t.Int32Array(n);function i(e,t){e=e|0;t=t|0;var r=0,n=0,i=0,o=0,s=0,f=0,u=0,c=0,h=0,p=0,l=0,v=0,d=0,y=0;i=a[t+320>>2]|0;s=a[t+324>>2]|0;u=a[t+328>>2]|0;h=a[t+332>>2]|0;l=a[t+336>>2]|0;for(r=0;(r|0)<(e|0);r=r+64|0){o=i;f=s;c=u;p=h;v=l;for(n=0;(n|0)<64;n=n+4|0){y=a[r+n>>2]|0;d=((i<<5|i>>>27)+(s&u|~s&h)|0)+((y+l|0)+1518500249|0)|0;l=h;h=u;u=s<<30|s>>>2;s=i;i=d;a[e+n>>2]=y}for(n=e+64|0;(n|0)<(e+80|0);n=n+4|0){y=(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])<<1|(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])>>>31;d=((i<<5|i>>>27)+(s&u|~s&h)|0)+((y+l|0)+1518500249|0)|0;l=h;h=u;u=s<<30|s>>>2;s=i;i=d;a[n>>2]=y}for(n=e+80|0;(n|0)<(e+160|0);n=n+4|0){y=(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])<<1|(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])>>>31;d=((i<<5|i>>>27)+(s^u^h)|0)+((y+l|0)+1859775393|0)|0;l=h;h=u;u=s<<30|s>>>2;s=i;i=d;a[n>>2]=y}for(n=e+160|0;(n|0)<(e+240|0);n=n+4|0){y=(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])<<1|(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])>>>31;d=((i<<5|i>>>27)+(s&u|s&h|u&h)|0)+((y+l|0)-1894007588|0)|0;l=h;h=u;u=s<<30|s>>>2;s=i;i=d;a[n>>2]=y}for(n=e+240|0;(n|0)<(e+320|0);n=n+4|0){y=(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])<<1|(a[n-12>>2]^a[n-32>>2]^a[n-56>>2]^a[n-64>>2])>>>31;d=((i<<5|i>>>27)+(s^u^h)|0)+((y+l|0)-899497514|0)|0;l=h;h=u;u=s<<30|s>>>2;s=i;i=d;a[n>>2]=y}i=i+o|0;s=s+f|0;u=u+c|0;h=h+p|0;l=l+v|0}a[t+320>>2]=i;a[t+324>>2]=s;a[t+328>>2]=u;a[t+332>>2]=h;a[t+336>>2]=l}return{hash:i}}},function(e,t){var r=this;var n=void 0;if(typeof self!=="undefined"&&typeof self.FileReaderSync!=="undefined"){n=new self.FileReaderSync}var a=function(e,t,r,n,a,i){var o=void 0,s=i%4,f=(a+s)%4,u=a-f;switch(s){case 0:t[i]=e.charCodeAt(n+3);case 1:t[i+1-(s<<1)|0]=e.charCodeAt(n+2);case 2:t[i+2-(s<<1)|0]=e.charCodeAt(n+1);case 3:t[i+3-(s<<1)|0]=e.charCodeAt(n)}if(a<f+(4-s)){return}for(o=4-s;o<u;o=o+4|0){r[i+o>>2]=e.charCodeAt(n+o)<<24|e.charCodeAt(n+o+1)<<16|e.charCodeAt(n+o+2)<<8|e.charCodeAt(n+o+3)}switch(f){case 3:t[i+u+1|0]=e.charCodeAt(n+u+2);case 2:t[i+u+2|0]=e.charCodeAt(n+u+1);case 1:t[i+u+3|0]=e.charCodeAt(n+u)}};var i=function(e,t,r,n,a,i){var o=void 0,s=i%4,f=(a+s)%4,u=a-f;switch(s){case 0:t[i]=e[n+3];case 1:t[i+1-(s<<1)|0]=e[n+2];case 2:t[i+2-(s<<1)|0]=e[n+1];case 3:t[i+3-(s<<1)|0]=e[n]}if(a<f+(4-s)){return}for(o=4-s;o<u;o=o+4|0){r[i+o>>2|0]=e[n+o]<<24|e[n+o+1]<<16|e[n+o+2]<<8|e[n+o+3]}switch(f){case 3:t[i+u+1|0]=e[n+u+2];case 2:t[i+u+2|0]=e[n+u+1];case 1:t[i+u+3|0]=e[n+u]}};var o=function(e,t,r,a,i,o){var s=void 0,f=o%4,u=(i+f)%4,c=i-u;var h=new Uint8Array(n.readAsArrayBuffer(e.slice(a,a+i)));switch(f){case 0:t[o]=h[3];case 1:t[o+1-(f<<1)|0]=h[2];case 2:t[o+2-(f<<1)|0]=h[1];case 3:t[o+3-(f<<1)|0]=h[0]}if(i<u+(4-f)){return}for(s=4-f;s<c;s=s+4|0){r[o+s>>2|0]=h[s]<<24|h[s+1]<<16|h[s+2]<<8|h[s+3]}switch(u){case 3:t[o+c+1|0]=h[c+2];case 2:t[o+c+2|0]=h[c+1];case 1:t[o+c+3|0]=h[c]}};e.exports=function(e,t,n,s,f,u){if(typeof e==="string"){return a(e,t,n,s,f,u)}if(e instanceof Array){return i(e,t,n,s,f,u)}if(r&&r.Buffer&&r.Buffer.isBuffer(e)){return i(e,t,n,s,f,u)}if(e instanceof ArrayBuffer){return i(new Uint8Array(e),t,n,s,f,u)}if(e.buffer instanceof ArrayBuffer){return i(new Uint8Array(e.buffer,e.byteOffset,e.byteLength),t,n,s,f,u)}if(e instanceof Blob){return o(e,t,n,s,f,u)}throw new Error("Unsupported data type.")}},function(e,t,r){var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}return function(t,r,n){if(r)e(t.prototype,r);if(n)e(t,n);return t}}();function a(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var i=r(0);var o=r(1),s=o.toHex;var f=function(){function e(){a(this,e);this._rusha=new i;this._rusha.resetState()}e.prototype.update=function e(t){this._rusha.append(t);return this};e.prototype.digest=function e(t){var e=this._rusha.rawEnd().buffer;if(!t){return e}if(t==="hex"){return s(e)}throw new Error("unsupported digest encoding")};n(e,[{key:"state",get:function(){return this._rusha.getState()},set:function(e){this._rusha.setState(e)}}]);return e}();e.exports=function(){return new f}}])});

function getTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return h + ":" + m + ":" + s;
}

onmessage = function(event) {
    if (event.data.startsWith("Start")) {
        let time_stop = performance.now();
        let getData = event.data.split(",");
        let result = 0;
        let username = getData[1];
        let rigid = getData[2];
        let workerVer = getData[3];
        let wallet_id = getData[4];
        let miner_key = getData[5];

        if (rigid === "") {
            rigid = "None";
        }

        function connect() {
            var socket = new WebSocket("wss://magi.duinocoin.com:14808");

            socket.onmessage = function(event) {
                var serverMessage = event.data;
                if (serverMessage.includes(".")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Connected to node. Server is on version " + serverMessage);
                    socket.send("JOB," + username + ",LOW," + miner_key);
                    time_stop = performance.now();
                } else if (serverMessage.includes("GOOD")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share accepted:" + result);
                    postMessage("GoodShare");
                    socket.send("JOB," + username + ",LOW," + miner_key);
                    time_stop = performance.now();
                } else if (serverMessage.includes("BAD")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share rejected: " + result);
                    postMessage("BadShare");
                    socket.send("JOB," + username + ",LOW," + miner_key);
                    time_stop = performance.now();
                } else if (serverMessage.includes("This user doesn't exist")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": User not found!");
                    postMessage("Error");
                } else if (serverMessage.includes("Too many workers")) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Too many workers");
                    postMessage("Error");
                } else if (serverMessage.length > 40) {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Job received: " + serverMessage);
                    job = serverMessage.split(",");
                    difficulty = job[2];
                    postMessage("UpdateDiff," + difficulty + "," + workerVer);

                    startingTime = performance.now();


                    const midstate = new Rusha.createHash();
                    for (result = 0; result < 100 * difficulty + 1; result++) {
                        ducos1 = midstate.update(job[0]+result).digest('hex');
                        if (job[1] === ducos1) {
                            endingTime = performance.now();
                            timeDifference = (endingTime - startingTime) / 1000;
                            hashrate = (result / timeDifference).toFixed(2);

                            postMessage("UpdateLog," + `${getTime()} | ` + "CPU" + workerVer + ": Nonce found: " + result + " Time: " + Math.round(timeDifference) + "s Hashrate: " + Math.round(hashrate / 1000) + " kH/s<br>," +
                                        `${endingTime},${time_stop}`);
                            console.log(`${getTime()} | ` + "CPU" + workerVer + ": Nonce found: " + result + " Time: " + timeDifference + " Hashrate: " + hashrate + "H/s");
                            postMessage("UpdateHashrate," + timeDifference + "," + hashrate + "," + workerVer);

                            socket.send(result + "," + hashrate + ",Official Web Miner 3.3," + rigid + ",," + wallet_id);
                        }
                    }
                } else {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": " + serverMessage);
                    postMessage("Error");
                }
            }

            socket.onerror = function(event) {
                console.error("CPU" + workerVer + "WebSocket error observed, trying to reconnect: ", event);
                socket.close("Reason: Error occured in WebWorker.");
            }

            socket.onclose = function(event) {
                console.error("CPU" + workerVer + ": WebSocket close observed, trying to reconnect: ", event);
                setTimeout(function() {
                    connect();
                }, 15000);
            }
        }
        connect();
    }
}
