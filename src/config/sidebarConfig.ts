import type { SidebarLayoutConfig } from "../types/sidebarConfig";

/**
 * 侧边栏布局配置
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 是否启用侧边栏功能
	enable: true,

	// 侧边栏位置：
	// 如果觉得双栏太挤，可以改成 "left" (仅左侧) 或 "right" (仅右侧)
	position: "left", 

	// 平板端显示哪侧
	tabletSidebar: "left",

	// 文章详情页隐藏侧边栏，设为 true 则只在首页等非文章页显示
	hideSidebarOnPostPage: true,

	// 本页没有侧栏列时，内容栏占「侧栏 + 内容栏」总宽的比例
	noSidebarContentWidth: 0.6,

	// ── 左侧边栏组件配置 ──────────────────────────────────
	leftComponents: [
		{
			// 用户资料（头像、名字、简介、社交图标）
			type: "profile",
			enable: true,
			position: "top",
			showOnPostPage: true,
		},
		{
			// 公告（用来发每日更新通知、解压密码等）
			type: "announcement",
			enable: true,
			position: "top",
			showOnPostPage: true,
		},
		{
			// 分类（RPG、SLG等）
			type: "categories",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: {
				collapseThreshold: 5, // 超过5个折叠
			},
		},
		{
			// 标签（动态、汉化等）
			type: "tags",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			specificConfig: {
				collapseThreshold: 10,
			},
		},
	],

	// ── 右侧边栏组件配置 ──────────────────────────────────
	rightComponents: [
		{
			// 最新动态
			type: "dynamic",
			enable: false,
			position: "top",
			showOnPostPage: true,
			specificConfig: {
				dynamic: { limit: 2 },
			},
		},
		{
			// 站点统计（文章数、字数等）
			type: "stats",
			enable: true,
			position: "top",
			showOnPostPage: false,
		},
		{
			// 侧边栏目录（只在看文章详情页时显示）
			type: "sidebarToc",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			hideOnNonPostPage: true,
		},
	],

	// ── 移动端底部组件配置 ──────────────────────────────────
	mobileBottomComponents: [
		{
			// 用户资料
			type: "profile",
			enable: true,
			showOnPostPage: true,
		},
		{
			// 公告
			type: "announcement",
			enable: true,
			showOnPostPage: true,
		},
		{
			// 分类
			type: "categories",
			enable: true,
			showOnPostPage: true,
			specificConfig: { collapseThreshold: 5 },
		},
		{
			// 动态
			type: "dynamic",
			enable: false,
			showOnPostPage: false,
			specificConfig: { dynamic: { limit: 2 } },
		},
	],
};