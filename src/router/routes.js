const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/HomePage.vue") }],
    children: [
      {
        path: "/cpu",
        name: "cpu",
        component: () => import("src/pages/cpu/CpuPage.vue"),
      },
      {
        path: "/cpuCreate",
        name: "createCpu",
        component: () => import("src/pages/cpu/CpuCreate.vue"),
      },
      {
        path: "/cpuEdit/:id",
        name: "edit",
        component: () => import("src/pages/cpu/CpuEdit.vue"),
      },
    ],
  },

  {
    path: "/register",
    component: () => import("src/pages/RegisterPage.vue"),
  },

  {
    path: "/login",
    name: "LoginPage",
    component: () => import("src/pages/LoginPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
