<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import Autoplay from "embla-carousel-autoplay";
  export let blogs: any[] = [];
</script>


<Carousel.Root
opts={{
  align: "start",
  loop: true,
}}
plugins={[
  Autoplay({
    delay:4000
  }),
]}
  class="w-full flex flex-col justify-center gap-6 "
>
  <Carousel.Content>
    {#each blogs as featuredBlog, i (i)}
      <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
        <a href={"/blog/" + featuredBlog.data.slug + "/"}>
          <div class="flex items-center gap-2">
            <div class="bg-white rounded-md self-stretch flex items-center min-w-[70px]"> 
              <img
                alt="feature"
                class="p-1 shadow-nav"
                width={70}
                height={70}
                src={featuredBlog.data.image.src}
              >
            </div>
            <p
              class="text-left text-fourth-color text-[12px] md:text-[14px] md:leading-[18px] tracking-tight"
            >
              {featuredBlog.data.tags[0]}
              <br />
              <span
                class="text-left mt-2 font-manrope text-[14px] text-fifth-color md:text-[16px] md:leading-[22px] tracking-tight"
              >
              {featuredBlog.data.title}
              </span>
            </p>
          </div>
        </a>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
</Carousel.Root>
