//import Image from "next/image";

const app_names = [
  'calendar', 'todo list', 'timer', 'github', 'lists', 'notes', 'research',
  'journal', 'accounting', 'ai', 'portfolio tracker', 'aquaculture', 'weather',
  'notifications', 'odoo', 'planning', 'tracking', 'gardening',
];

const apps = app_names.map((name, key) => ({'name':name, 'key':key}));

export default function Home() {
	
  const app_cards = apps.map((app) =>	
	<div key={app.key} className="card">
	  <div className="card-body">
		<h3>{app.name}</h3>
	  </div>
	</div>
  );
  return (
    <div className="grid grid-cols-3">
	  {app_cards}
	</div>
  );
}
