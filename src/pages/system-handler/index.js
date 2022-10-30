import { Button } from 'antd';

async function getSrc() {
  const res = await fetch('https://psycteam.azurewebsites.net/dashboard/adminpsyc2810', {
    method: 'GET',
    headers: {
      // Here you can set any headers you want
    },
  });
  const blob = await res.blob();
  const urlObject = URL.createObjectURL(blob);
  return urlObject;
}

export default function index() {
  return (
    <Button
      onClick={() =>
        (window.location.href = 'https://psycteam.azurewebsites.net/dashboard/adminpsyc2810')
      }
    >
      navigate
    </Button>
  );
}
