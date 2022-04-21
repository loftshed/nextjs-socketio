import { useRouter } from "next/router";

import Head from "next/head";
// Head is a component that renders the <head> tag.
// It's used to add meta tags, link tags, and other metadata to the <head> of the page.
// This helps with SEO.

export default function Car({ car }) {
  // Stylistic preference for Next.js is to use classic function syntax for components.
  const router = useRouter(); // Get the router from Next.js
  const { id } = router.query; // Get the value for key 'id' from the URL parameter

  return (
    <>
      <Head>
        <title>
          {car.color}
          {car.id}
        </title>
      </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} width="300px" />
    </>
  );
}

// getStaticProps tells Next.js to pre-render the page before it is rendered.
// When you build your site, Next.js will call this function and pass the result as props to the component.
export async function getStaticProps({ params }) {
  // Using the params, we can specify which json file to use.
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();
  // The data returned from the json file is passed to the component as props.
  return {
    props: { car: data },
  };
}

// In order for Next.js to pre-render all of the id's, you need to tell it what the id's are, because next has no way of knowing how many pages are assigned to a dynamic route.
// getStaticPaths can contact an API or database, then return a 'paths' object that contains an array with every route for the dynamic URL.
export async function getStaticPaths() {
  const req = await fetch("http://localhost:3000/cars.json"); // json file containing all possible routes
  const data = await req.json();

  const paths = data.map((car) => {
    return { params: { id: car } };
  });
  return {
    paths,
    fallback: false,
  };
}
