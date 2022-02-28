import type { NextPage } from "next";
import { useCallback, useState, forwardRef } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import {
  Container,
  Center,
  Grid,
  Title,
  Text,
  TextInput,
  Menu,
  UnstyledButton,
  UnstyledButtonProps
} from "@mantine/core";
import SEO from "@components/SEO";
import SanityNextImage from "@components/SanityNextImage";
import { getAllPosts, getAllCategories } from "@lib/sanity.server";
import { toDateString } from "@lib/helpers";
import type { AllSanityPost, AllSanityCategory } from "../../@types/sanity";

interface Props {
  data: {
    posts: AllSanityPost[];
    categories: AllSanityCategory[];
  };
  preview: boolean;
}

interface FilterButtonProps extends UnstyledButtonProps {
  icon?: React.ReactNode;
}

const BlogPage: NextPage<Props> = ({ data, preview }) => {
  const { posts, categories } = data;
  const [state, setState] = useState({
    filteredData: posts,
    query: ""
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.trim();

      const filteredData = posts.filter((post) => {
        const { description, title, categories } = post;
        const tag = categories && categories[0]?.title;

        return (
          description.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase()) ||
          (tag && tag.toLowerCase().includes(query.toLowerCase()))
        );
      });

      setState({
        query,
        filteredData
      });
    },
    [posts]
  );

  const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
    ({ icon, ...others }: FilterButtonProps, ref) => (
      <UnstyledButton
        aria-labelledby="Filter button"
        ref={ref}
        sx={(theme) => ({
          display: "block",
          padding: 5,
          borderRadius: "100%",
          color:
            theme.colorScheme === "dark"
              ? theme.colors.gray[5]
              : theme.colors.gray[6],

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0]
          }
        })}
        {...others}
      >
        {icon}
      </UnstyledButton>
    )
  );

  return (
    <>
      <SEO title={"Blog"} description={"A collection of my blog posts"} />
      <section>
        <Container size="xl" padding={20} my={96}>
          <Center>
            <Title order={1} my="md">
              Blog Post
            </Title>
          </Center>
          <Center mb={80}>
            <Text size="md" mb="md">
              I write stuff I find interesting.
            </Text>
          </Center>

          <Grid>
            <Grid.Col span={11}>
              <TextInput
                placeholder="Search..."
                aria-label="Search"
                onChange={handleInputChange}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Menu
                menuButtonLabel="Filter button"
                control={
                  <FilterButton
                    icon={
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5" />
                      </svg>
                    }
                  />
                }
              >
                <Menu.Label>Filter</Menu.Label>
                <Menu.Item>all posts</Menu.Item>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <Menu.Item key={category._id}>{category.title}</Menu.Item>
                    );
                  })}
              </Menu>
            </Grid.Col>
          </Grid>

          {state.filteredData.length > 0 &&
            state.filteredData.map((post) => {
              return (
                <Grid key={post._id} my={32}>
                  <Grid.Col xs={2}>
                    <SanityNextImage
                      image={post.mainImage}
                      options={{
                        className: "rounded-lg",
                        alt: post.mainImage?.alt ?? `${post.title} main image`,
                        layout: "responsive",
                        placeholder: post.mainImage?.lqip ? "blur" : undefined,
                        blurDataURL: post.mainImage?.lqip,
                        sizes: "(max-width: 800px) 100vw, 800px"
                      }}
                    />
                  </Grid.Col>
                  <Grid.Col xs={10}>
                    <Link
                      href={{
                        pathname: "/blog/[slug]",
                        query: { slug: post.slug }
                      }}
                      passHref
                    >
                      <a>
                        <Title order={3}>{post.title}</Title>
                        <Text size="md">{toDateString(post.publishedAt)}</Text>
                        <Text size="md">{post.description}</Text>
                      </a>
                    </Link>
                  </Grid.Col>
                </Grid>
              );
            })}
        </Container>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  const data = { posts, categories };

  return {
    props: { data, preview },
    revalidate: 60
  };
};

export default BlogPage;
