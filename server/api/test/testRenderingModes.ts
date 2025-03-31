export default defineEventHandler((event) => {
    return getNumber();
});

/**
 * For Testing SWR RouteRule and seeing it in praxis
 */
let index = 0;
let res = 0;
function getNumber(): number {
    index++;
    // change result number every 2th request, to the number of changes
    // if(index % 2 === 0){ //every 2th. request
    //     res = index / 2;
    //     return  res;
    // }
    res = index;
    console.log("Server.number = "+res);

    return res;
}
