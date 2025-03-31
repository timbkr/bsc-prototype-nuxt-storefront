export default defineEventHandler( async (event) => {

    await $fetch('/testOnDemand');
    

    return "success";
})