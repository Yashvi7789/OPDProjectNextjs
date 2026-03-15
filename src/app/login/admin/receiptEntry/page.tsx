// "use client";

// import { useEffect, useState } from "react";

// export default function ReceiptEntryPage() {
// const [receipts,setReceipts]=useState([]);
// const [opd,setOpd]=useState([]);
// const [subTreatments,setSubTreatments]=useState([]);
// const [showForm,setShowForm]=useState(false);

// const [items,setItems]=useState([{SubTreatmentTypeID:"",ParticularName:"",Qty:1,Rate:0,Amount:0}]);

// const [form,setForm]=useState({
// ReceiptNo:"",
// ReceiptDate:"",
// OPDID:"",
// PaymentModeID:1,
// Description:""
// });

// useEffect(()=>{
// fetch("/api/Receipts").then(res=>res.json()).then(data=>setReceipts(data));
// fetch("/api/Opd").then(res=>res.json()).then(data=>setOpd(data));
// fetch("/api/SubtreatmentTypes").then(res=>res.json()).then(data=>setSubTreatments(data));
// },[]);

// const handleChange=(e)=>{
// setForm({...form,[e.target.name]:e.target.value});
// };

// const handleItemChange=(index,field,value)=>{
// const updated=[...items];
// updated[index][field]=value;

// if(field==="SubTreatmentTypeID"){
// const selected=subTreatments.find(s=>s.SubTreatmentTypeID==value);
// if(selected){
// updated[index].ParticularName=selected.SubTreatmentTypeName;
// updated[index].Rate=Number(selected.Rate);
// updated[index].Amount=updated[index].Qty*Number(selected.Rate);
// }
// }

// if(field==="Qty"||field==="Rate"){
// updated[index].Amount=Number(updated[index].Qty)*Number(updated[index].Rate);
// }

// setItems(updated);
// };

// const addRow=()=>{
// setItems([...items,{SubTreatmentTypeID:"",ParticularName:"",Qty:1,Rate:0,Amount:0}]);
// };

// const removeRow=(i)=>{
// setItems(items.filter((_,index)=>index!==i));
// };

// const total=items.reduce((sum,item)=>sum+Number(item.Amount),0);

// const handleSubmit=async(e)=>{
// e.preventDefault();

// const res=await fetch("/api/Receipts",{
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify({...form,OPDID:Number(form.OPDID),AmountPaid:total,UserID:1})
// });

// const data=await res.json();
// const receiptID=data.ReceiptID;

// for(const item of items){
// await fetch("/api/ReceiptTran",{
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify({
// ReceiptID:receiptID,
// ParticularName:item.ParticularName,
// Qty:item.Qty,
// Rate:item.Rate,
// Amount:item.Amount,
// UserID:1
// })
// });
// }

// setShowForm(false);
// };

// return(
// <div className="p-8 bg-gray-50 min-h-screen">

// <div className="flex justify-between items-center mb-8">
// <div>
// <h1 className="text-3xl font-bold text-gray-900">Receipt Entry</h1>
// <p className="text-gray-500">Generate patient receipts</p>
// </div>
// <button onClick={()=>setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow">+ Create Receipt</button>
// </div>

// <div className="bg-white rounded-xl shadow border overflow-hidden">
// <table className="w-full text-sm">
// <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
// <tr>
// <th className="px-6 py-4 text-left">Receipt No</th>
// <th className="px-6 py-4 text-left">Date</th>
// <th className="px-6 py-4 text-left">OPD</th>
// <th className="px-6 py-4 text-left">Amount</th>
// </tr>
// </thead>
// <tbody className="divide-y">
// {receipts.map(r=>(
// <tr key={r.ReceiptID} className="hover:bg-gray-50 text-gray-400">
// <td className="px-6 py-4 text-gray-400">{r.ReceiptNo}</td>
// <td className="px-6 py-4 text-gray-400">{new Date(r.ReceiptDate).toLocaleDateString()}</td>
// <td className="px-6 py-4 text-gray-400">{r.OPDID}</td>
// <td className="px-6 py-4 text-indigo-600 font-semibold">₹ {r.AmountPaid}</td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>

// {showForm&&(
// <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// <form onSubmit={handleSubmit} className="bg-white w-[900px] rounded-xl shadow-xl p-8 space-y-6">

// <h2 className="text-xl font-semibold text-gray-400">Create New Receipt</h2>

// <div className="grid grid-cols-3 gap-4">
// <input name="ReceiptNo" placeholder="Receipt No" value={form.ReceiptNo} onChange={handleChange} className="border p-2.5 rounded text-gray-600"/>
// <input type="date" name="ReceiptDate" value={form.ReceiptDate} onChange={handleChange} className="border p-2.5 rounded text-gray-600"/>

// <select name="OPDID" value={form.OPDID} onChange={handleChange} className="border p-2.5 rounded text-gray-600">
// <option value="">Select OPD</option>
// {opd.map(o=>(
// <option key={o.OPDID} value={o.OPDID}>{o.OPDNo} - {o.PatientName}</option>
// ))}
// </select>
// </div>

// <div>
// <h3 className="font-semibold mb-2 text-gray-600">Receipt Items</h3>

// <table className="w-full border text-sm">
// <thead className="bg-gray-100">
// <tr>
// <th className="p-3 text-left">Particular</th>
// <th className="p-3">Qty</th>
// <th className="p-3">Rate</th>
// <th className="p-3">Amount</th>
// <th></th>
// </tr>
// </thead>

// <tbody>
// {items.map((item,index)=>(
// <tr key={index}>
// <td className="p-2">
// <select value={item.SubTreatmentTypeID} onChange={(e)=>handleItemChange(index,"SubTreatmentTypeID",e.target.value)} className="border p-2 w-full rounded text-gray-600">
// <option value="">Select Particular</option>
// {subTreatments.map(s=>(
// <option key={s.SubTreatmentTypeID} value={s.SubTreatmentTypeID}>{s.SubTreatmentTypeName}</option>
// ))}
// </select>
// </td>

// <td className="p-2">
// <input type="number" value={item.Qty} onChange={(e)=>handleItemChange(index,"Qty",e.target.value)} className="border p-2 w-full rounded text-gray-600"/>
// </td>

// <td className="p-2">
// <input type="number" value={item.Rate} onChange={(e)=>handleItemChange(index,"Rate",e.target.value)} className="border p-2 w-full rounded text-gray-600"/>
// </td>

// <td className="p-2 text-center text-gray-600">₹ {item.Amount}</td>

// <td className="p-2">
// <button type="button" onClick={()=>removeRow(index)} className="text-red-600 px-3 py-1 rounded hover:bg-red-50">Remove</button>
// </td>
// </tr>
// ))}
// </tbody>
// </table>

// <button type="button" onClick={addRow} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">+ Add Item</button>
// </div>

// <div className="flex justify-end">
// <div className="bg-indigo-50 px-6 py-3 rounded-lg font-bold text-lg text-indigo-700">Total : ₹ {total}</div>
// </div>

// <div className="flex justify-end gap-3">
// <button type="button" onClick={()=>setShowForm(false)} className="border px-5 py-2 rounded text-gray-600">Cancel</button>
// <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Save Receipt</button>
// </div>

// </form>
// </div>
// )}

// </div>
// );
// }



"use client";

import { useEffect, useState } from "react";

export default function ReceiptEntryPage() {

const [receipts,setReceipts]=useState([]);
const [opd,setOpd]=useState([]);
const [subTreatments,setSubTreatments]=useState([]);
const [showForm,setShowForm]=useState(false);
const [editing,setEditing]=useState(false);

const [items,setItems]=useState([{SubTreatmentTypeID:"",ParticularName:"",Qty:1,Rate:0,Amount:0}]);

const [form,setForm]=useState({
ReceiptID:"",
ReceiptNo:"",
ReceiptDate:"",
OPDID:"",
PaymentModeID:1,
Description:""
});

useEffect(()=>{
fetchReceipts();
fetch("/api/Opd").then(res=>res.json()).then(data=>setOpd(data));
fetch("/api/SubtreatmentTypes").then(res=>res.json()).then(data=>setSubTreatments(data));
},[]);

const fetchReceipts=()=>{
fetch("/api/Receipts").then(res=>res.json()).then(data=>setReceipts(data));
};

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleItemChange=(index,field,value)=>{
const updated=[...items];
updated[index][field]=value;

if(field==="SubTreatmentTypeID"){
const selected=subTreatments.find(s=>s.SubTreatmentTypeID==value);
if(selected){
updated[index].ParticularName=selected.SubTreatmentTypeName;
updated[index].Rate=Number(selected.Rate);
updated[index].Amount=updated[index].Qty*Number(selected.Rate);
}
}

if(field==="Qty"||field==="Rate"){
updated[index].Amount=Number(updated[index].Qty)*Number(updated[index].Rate);
}

setItems(updated);
};

const addRow=()=>{
setItems([...items,{SubTreatmentTypeID:"",ParticularName:"",Qty:1,Rate:0,Amount:0}]);
};

const removeRow=(i)=>{
setItems(items.filter((_,index)=>index!==i));
};

const total=items.reduce((sum,item)=>sum+Number(item.Amount),0);

const handleSubmit=async(e)=>{
e.preventDefault();

if(editing){

await fetch(`/api/Receipts/${form.ReceiptID}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({...form,AmountPaid:total})
});

}else{

const res=await fetch("/api/Receipts",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({...form,OPDID:Number(form.OPDID),AmountPaid:total,UserID:1})
});

const data=await res.json();
const receiptID=data.ReceiptID;

for(const item of items){
await fetch("/api/ReceiptTran",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
ReceiptID:receiptID,
ParticularName:item.ParticularName,
Qty:item.Qty,
Rate:item.Rate,
Amount:item.Amount,
UserID:1
})
});
}

}

setShowForm(false);
setEditing(false);

setForm({
ReceiptID:"",
ReceiptNo:"",
ReceiptDate:"",
OPDID:"",
PaymentModeID:1,
Description:""
});

setItems([{SubTreatmentTypeID:"",ParticularName:"",Qty:1,Rate:0,Amount:0}]);

fetchReceipts();
};

const handleEdit=(r)=>{
setEditing(true);
setForm(r);
setShowForm(true);
};

const handleDelete=async(id)=>{
if(!confirm("Delete this receipt?")) return;

await fetch(`/api/Receipts/${id}`,{method:"DELETE"});
fetchReceipts();
};

return(
<div className="p-8 bg-gray-50 min-h-screen">

<div className="flex justify-between items-center mb-8">
<div>
<h1 className="text-3xl font-bold text-gray-900">Receipt Entry</h1>
<p className="text-gray-500">Generate patient receipts</p>
</div>
<button onClick={()=>{setShowForm(true);setEditing(false);}} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow">+ Create Receipt</button>
</div>

<div className="bg-white rounded-xl shadow border overflow-hidden">
<table className="w-full text-sm">
<thead className="bg-gray-100 text-gray-600 text-xs uppercase">
<tr>
<th className="px-6 py-4 text-left">Receipt No</th>
<th className="px-6 py-4 text-left">Date</th>
<th className="px-6 py-4 text-left">OPD</th>
<th className="px-6 py-4 text-left">Amount</th>
<th className="px-6 py-4 text-left">Action</th>
</tr>
</thead>

<tbody className="divide-y">
{receipts.map(r=>(
<tr key={r.ReceiptID} className="hover:bg-gray-50 text-gray-400">

<td className="px-6 py-4 text-gray-400">{r.ReceiptNo}</td>

<td className="px-6 py-4 text-gray-400">
{new Date(r.ReceiptDate).toLocaleDateString()}
</td>

<td className="px-6 py-4 text-gray-400">{r.OPDID}</td>

<td className="px-6 py-4 text-indigo-600 font-semibold">
₹ {r.AmountPaid}
</td>

<td className="px-6 py-4 flex gap-2">
<button onClick={()=>handleEdit(r)} className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Update</button>
<button onClick={()=>handleDelete(r.ReceiptID)} className="text-white mr-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
</td>

</tr>
))}
</tbody>
</table>
</div>

{showForm&&(
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<form onSubmit={handleSubmit} className="bg-white w-[900px] rounded-xl shadow-xl p-8 space-y-6">

<h2 className="text-xl font-semibold text-gray-400">
{editing?"Update Receipt":"Create New Receipt"}
</h2>

<div className="grid grid-cols-3 gap-4">

<input name="ReceiptNo" placeholder="Receipt No" value={form.ReceiptNo} onChange={handleChange} className="border p-2.5 rounded text-gray-600"/>

<input type="datetime-local" name="ReceiptDate" value={form.ReceiptDate} onChange={handleChange} className="border p-2.5 rounded text-gray-600"/>

<select name="OPDID" value={form.OPDID} onChange={handleChange} className="border p-2.5 rounded text-gray-600">
<option value="">Select OPD</option>
{opd.map(o=>(
<option key={o.OPDID} value={o.OPDID}>{o.OPDNo} - {o.PatientName}</option>
))}
</select>

</div>

<div>
<h3 className="font-semibold mb-2 text-gray-600">Receipt Items</h3>

<table className="w-full border text-sm">

<thead className="bg-gray-100">
<tr>
<th className="p-3 text-left">Particular</th>
<th className="p-3">Qty</th>
<th className="p-3">Rate</th>
<th className="p-3">Amount</th>
<th></th>
</tr>
</thead>

<tbody>

{items.map((item,index)=>(
<tr key={index}>

<td className="p-2">
<select value={item.SubTreatmentTypeID} onChange={(e)=>handleItemChange(index,"SubTreatmentTypeID",e.target.value)} className="border p-2 w-full rounded text-gray-600">
<option value="">Select Particular</option>
{subTreatments.map(s=>(
<option key={s.SubTreatmentTypeID} value={s.SubTreatmentTypeID}>{s.SubTreatmentTypeName}</option>
))}
</select>
</td>

<td className="p-2">
<input type="number" value={item.Qty} onChange={(e)=>handleItemChange(index,"Qty",e.target.value)} className="border p-2 w-full rounded text-gray-600"/>
</td>

<td className="p-2">
<input type="number" value={item.Rate} onChange={(e)=>handleItemChange(index,"Rate",e.target.value)} className="border p-2 w-full rounded text-gray-600"/>
</td>

<td className="p-2 text-center text-gray-600">₹ {item.Amount}</td>

<td className="p-2">
<button type="button" onClick={()=>removeRow(index)} className="text-red-600 px-3 py-1 rounded hover:bg-red-50">Remove</button>
</td>

</tr>
))}

</tbody>

</table>

<button type="button" onClick={addRow} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">+ Add Item</button>

</div>

<div className="flex justify-end">
<div className="bg-indigo-50 px-6 py-3 rounded-lg font-bold text-lg text-indigo-700">Total : ₹ {total}</div>
</div>

<div className="flex justify-end gap-3">

<button type="button" onClick={()=>setShowForm(false)} className="border px-5 py-2 rounded text-gray-600">Cancel</button>

<button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
{editing?"Update Receipt":"Save Receipt"}
</button>

</div>

</form>

</div>
)}

</div>
);
}



