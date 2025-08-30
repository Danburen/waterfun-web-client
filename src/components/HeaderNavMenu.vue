<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {Bell, Message, Search} from '@element-plus/icons-vue'
import {useAuth} from "~/composables/useAuth";
import {useUserStore} from "~/stores/userStore";

const { isLoggedIn, logout } = useAuth()
const userData = useUserStore().userData
const router = useRouter()
const searchQuery = ref('')
const unreadNOTICount = ref(5)
const unreadMSGCount = ref(5)

const userName = ref(userData.username)
const userEmail = ref('zhangsan@example.com')
const userAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const navItems = {
  home: '/home',
  community: '/community',
  playground: '/playground',
  chatroom: '/chatroom',
  about: '/about',
}

const handleSearch = () => {
  console.log('搜索内容:', searchQuery.value)
}

const handleNotification = () => {
  console.log('点击了通知按钮')
  unreadNOTICount.value = 0
}

const handleMessage = () => {
  console.log('点击了消息按钮')
  unreadMSGCount.value = 0
}

const handleLogout = () => {
  logout().then(() => {
    ElMessage({
      message: translate('message.success.logoutSuccess'),
      type: 'success'
    })
    router.push('/login')
  })
}

const handleCommand = (command:string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleLogin = ()=>{
  router.push('/login')
}

onMounted(()=>{
  console.log(userData)
  console.log(isLoggedIn.value)
})
</script>


<template>
  <div class="header-container">
    <el-header class="app-header items-center">
      <div class="align-center">
        <div class="align-center">
          <img style="width: 32px; height: 32px; margin-right: 10px;" src="@/assets/logo.svg" alt="Logo" class="logo" />
          <a style="font-size: 18px; font-weight: bold; color: #333;"
             class="logo-text menu-item" @click="router.push('/')">WaterFun</a>
        </div>
        <a v-for="(key,value) in navItems" :key="key" :href="`${value}`" class="menu-item">{{ $t(`navbar.${value}`) }}</a>
      </div>

      <div class="header-center">
        <el-input
            v-model="searchQuery"
            placeholder="请输入搜索内容"
            class="search-input"
            @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button type="primary" :icon="Search"></el-button>
          </template>
        </el-input>
      </div>

      <!-- 右侧个人信息区域 -->
      <div class="align-center">
        <!-- 订阅消息按钮 -->
        <div class="menu-item-small">
          <el-badge
              :hidden="unreadNOTICount === 0"
              :is-dot="unreadNOTICount === 1"
              :value="unreadNOTICount"
              :max="99" class="badge">
            <el-button
                link
                class="reminder-btn"
                @click="handleNotification">
              <el-icon size="22">
                <Bell></Bell>
              </el-icon>
            </el-button>
          </el-badge>
        </div>
        <!-- 消息按钮 -->
        <div class="menu-item-small">
          <el-badge
              :hidden="unreadMSGCount === 0"
              :is-dot="unreadMSGCount === 1"
              :value="unreadMSGCount"
              :max="99" class="badge">
            <el-button
              link
              class="reminder-btn"
              @click="handleMessage">
              <el-icon :size="22">
                <Message></Message>
              </el-icon>
            </el-button>
          </el-badge>
        </div>
        <!-- 个人中心下拉菜单 -->
        <el-dropdown
            trigger="hover"
            placement="bottom"
            @command="handleCommand"
            class="menu-item items-center user-dropdown"
        >
          <div class="user-profile">
            <el-button link class="user-btn" @click="handleLogin">
              <el-avatar
                  :size="36"
                  :src="userAvatar"
                  class="user-avatar"
              />
              <span class="user-name">{{ isLoggedIn===false ? '未登录' : userName }}</span>
            </el-button>
          </div>
            <template  #dropdown>
              <el-dropdown-menu class="user-dropdown">
                <el-dropdown-item class="user-info">
                  <div  class="user-info-content">
                    <el-avatar
                        :size="38"
                        :src="userAvatar"
                        class="dropdown-avatar"
                    />
                    <div class="user-details">
                      <div class="user-name">{{ userName }}</div>
                      <div class="user-email">{{ userEmail }}</div>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided command="profile">
                  <i class="el-icon-user"></i>个人中心
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <i class="el-icon-setting"></i>系统设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <i class="el-icon-switch-button"></i>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>



<style scoped>
.header-container {
  justify-content: space-between !important;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  top: 0;
  z-index: 1000;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.menu-item {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

.menu-item-small {
  margin: 0 5px;
}

a:hover {
  color: #66b1ff;
  cursor: pointer;
}


.logo-container .logo-text:hover {
  color: #66b1ff;
  cursor: pointer;
}
/* 中部搜索框样式 */
.header-center {
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
}

.search-input .el-input-group__append {
  background-color: #409EFF;
  color: white;
  border-color: #409EFF;
}

.search-input .el-input-group__append:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}


.reminder-btn {
  font-size: 18px;
  color: #606266;
}


.badge .el-badge__content {
  top: 10px;
}

/* 用户下拉菜单样式 */
.user-profile {
  padding: 0 20px;
}

.user-profile .user-btn {
  display: flex;
  align-items: center;
  padding: 20px;
}

.user-profile .user-name {
  margin-right: 8px;
  font-size: 14px;
  color: #606266;
}

.user-profile .user-avatar {
  cursor: pointer;
  margin-right: 5px;
}

/* 下拉菜单样式 */
.user-dropdown {
  width: 200px;
}

.user-dropdown .user-info {
  padding: 10px 15px;
  cursor: default;
}

.user-dropdown .el-tooltip__trigger { outline: none; }

.user-dropdown .user-info:hover {
  background-color: white !important;
}

.user-dropdown .user-info-content {
  display: flex;
  align-items: center;
}

.user-dropdown .dropdown-avatar {
  margin-right: 12px;
}

.user-dropdown .user-details .user-name {
  font-weight: bold;
  margin: 0;
}

.user-dropdown .user-details .user-email {
  font-size: 12px;
  color: #909399;
}

/*dropdown item 边距*/
.user-dropdown .el-dropdown-menu__item {
  padding: 10px 15px; /* 增加上下内边距 */
  min-height: 40px;   /* 替代固定height，避免内容挤压 */
  line-height: 1.5;   /* 更灵活的行高 */
}
.user-dropdown .el-dropdown-menu__item i {
  margin-right: 8px;
}
</style>