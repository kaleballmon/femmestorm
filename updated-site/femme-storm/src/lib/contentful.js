import * as contentful from "contentful";

export const contentfulClient = contentful.createClient({
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
  space: import.meta.env.CONTENTFUL_SPACE_ID,
});

export async function fetchMediums() {
  const mediums = await contentfulClient.getEntries({
    content_type: "workMediums",
    include: 2,
  });

  return mediums;
}
