export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/dashboard",
      label: "Home",
    },
    // {
    //   imgURL: "/assets/search.svg",
    //   route: "/search",
    //   label: "Search",
    // },
  
    {
      imgURL: "/assets/create.svg",
      route: "/dashboard/create-post",
      label: "Create Post",
    },
  
    {
      imgURL: "/assets/user.svg",
      route: "/dashboard/profile",
      label: "Profile",
    },
  ];
  
  export const profileTabs = [
    { value: "ActivePosts", label: "Active Posts", icon: "/assets/reply.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];