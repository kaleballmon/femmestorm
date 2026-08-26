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
  const response = await contentfulClient.getEntries({
    content_type: "workMediums",
    include: 2,
  });

  return response;
}

function getGroupEntryUrl(medium, category, group) {
    return `/${medium}/${category}/${group.fields.slug}`;
}

function getCategoryEntryUrl(medium, category) {
  const basePath = `/${medium}/${category.fields.slug}`;
  if (category.fields.groups) {
    return getGroupEntryUrl(medium, category.fields.slug, category.fields.groups[0]);
  }

  return basePath;
}

export async function fetchCategories(medium) {
  const response = await contentfulClient.getEntries({
    content_type: "workMediums",
    "fields.name": medium,
    include: 2,
    limit: 1,
  });

  if (response.items.length > 0) {
    const entry = response.items[0];
    return entry.fields.categories.map((category) => ({
      name: category.fields.category,
      href: getCategoryEntryUrl(medium, category),
    }));
  }

  return null;
}

export async function fetchGroups(medium, category) {
  const response = await contentfulClient.getEntries({
    content_type: "workCategory",
    "fields.category": category,
    limit: 1,
  });

  if (response.items.length > 0) {
    const entry = response.items[0];
    return entry.fields.groups.map((group) => ({
      name: group.fields.title,
      href: getGroupEntryUrl(medium, category, group),
    }));
  }

  return null;
}
