import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "2l91lkg6",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-10",
});

const builder = imageUrlBuilder(client);
export const urlfor = (source) => builder.image(source);

export default client;
