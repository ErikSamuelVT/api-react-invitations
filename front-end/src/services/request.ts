export const sendRequest = async (requestParameter:string, method:string, dataForm?:object )=>{
    const res = await fetch(`http://localhost:3000/${requestParameter}`,{
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataForm)
    })
    return await res.json()
  }