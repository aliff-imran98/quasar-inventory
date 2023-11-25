const routes = [
  {
    path: "/",
    meta: {
      title: "Home",
      auth: true,
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "HomePage",
        meta: {
          title: "Home",
          auth: true,
        },
        component: () => import("src/pages/HomePage.vue"),
      },
      {
        path: "/cpu",
        name: "cpu",
        meta: {
          title: "Cpu",
          auth: true,
        },
        component: () => import("src/pages/cpu/CpuPage.vue"),
      },
      {
        path: "/cpuCreate",
        name: "createCpu",
        meta: {
          title: "Create Cpu",
          auth: true,
        },
        component: () => import("src/pages/cpu/CpuCreate.vue"),
      },
      {
        path: "/cpuEdit/:id",
        name: "cpuEdit",
        meta: {
          title: " Edit Cpu",
          auth: true,
        },
        component: () => import("src/pages/cpu/CpuEdit.vue"),
      },
      {
        path: "/mobo",
        name: "mobo",
        meta: {
          title: "MotherBoard",
          auth: true,
        },
        component: () => import("src/pages/mobo/MoboPage.vue"),
      },
      {
        path: "/moboCreate",
        name: "createMobo",
        meta: {
          title: "Create MotherBoard",
          auth: true,
        },
        component: () => import("src/pages/mobo/MoboCreate.vue"),
      },
      {
        path: "/moboEdit/:id",
        name: "moboEdit",
        meta: {
          title: "Edit MotherBoard",
          auth: true,
        },
        component: () => import("src/pages/mobo/MoboEdit.vue"),
      },
      {
        path: "/gpu",
        name: "gpu",
        meta: {
          title: "Gpu",
          auth: true,
        },
        component: () => import("src/pages/gpu/GpuPage.vue"),
      },
      {
        path: "/gpuCreate",
        name: "createGpu",
        meta: {
          title: "Create MotherBoard",
          auth: true,
        },
        component: () => import("src/pages/gpu/GpuCreate.vue"),
      },
      {
        path: "/gpuEdit/:id",
        name: "gpuEdit",
        meta: {
          title: "Edit MotherBoard",
          auth: true,
        },
        component: () => import("src/pages/gpu/GpuEdit.vue"),
      },
    ],
  },

  {
    path: "/auth",
    auth: false,
    component: () => import("src/layouts/BlankLayout.vue"),
    children: [
      {
        path: "register",
        name: "RegisterPage",
        meta: {
          title: "Register",
          auth: false,
        },
        component: () => import("src/pages/RegisterPage.vue"),
      },
      {
        path: "login",
        name: "LoginPage",
        meta: {
          title: "Register",
          auth: false,
        },
        component: () => import("src/pages/LoginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
