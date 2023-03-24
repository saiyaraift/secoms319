 //Author: Saiyara Iftekharuzzaman
//ISU Netid: saiyara@iastate.edu
//Date: 3/24/23
 export function UserCard(props){




return <div>
<h1>{props.name}</h1>
<p>💲{props.amount}</p>
<p>{props.married ? 'married':'single'}</p>
<ul>
<li>Street:{props.address.street}</li>
<li>City:{props.address.city}</li>
<li>State:{props.address.state}</li>

</ul>
</div>


}