<template>
  <div>
    <v-row>
      <v-col cols="3" style="max-width: 200px">
        <v-list>
          <v-list-subheader>收藏列表</v-list-subheader>

          <v-list-item
              v-for="group in collectionGroupList"
              :key="group.id"
              active-color="primary"
              rounded="xl"
              @click="selectGroup(group)"
          >

            <div class="d-collection-list">
              <v-icon icon="mdi-folder-heart-outline" class="mr-2"></v-icon>
              {{ group.groupName }}
              <span class="text-grey float-right">{{ group.collectionNum }}</span>
            </div>
            <v-divider class="mt-1"></v-divider>
          </v-list-item>
        </v-list>
      </v-col>
      <v-divider vertical="f"></v-divider>

      <v-col cols="9" v-if="currentSelectGroup">
        <v-card class="pa-1 mb-2">
          <v-card-title>
            {{ currentSelectGroup.groupName }}
          </v-card-title>
          <v-card-text>
            简介：{{ currentSelectGroup.introduction }}
          </v-card-text>
          <v-card-subtitle>
            {{ currentSelectGroup.collectionNum }}/999个内容
            <span>
              创建时间{{ dateFilter(currentSelectGroup.createTime) }}
            </span>
          </v-card-subtitle>
        </v-card>

        <client-only>
          <v-row class="d-flex">
            <v-col>
              <div>
                <v-menu location="bottom" nudge-bottom>
                  <template v-slot:activator="{ props }">
                    <v-btn
                        color="info"
                        v-bind="props"
                        class="mx-2"
                    >
                      <span style="font-size: 16px">收藏类型：{{ CollectionTypeZh[selectCollectionType] }}</span>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                        v-for="(item, index) in CollectionTypeZh"
                        :key="index"
                    >
                      <v-btn elevation="0" @click="selectOrderCollectionType(index)">{{ item }}
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-menu location="bottom" nudge-bottom>
                  <template v-slot:activator="{ props }">
                    <v-btn
                        color="info"
                        v-bind="props"
                    >
                      <!--                      prepend-icon="mdi-menu"-->
                      <span style="font-size: 16px">排序：{{ orderBy[order] }}</span>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                        v-for="(item, index) in orderBy"
                        :key="index"
                    >
                      <v-btn elevation="0" @click="selectOrder(index)">{{ item }}
                      </v-btn>
                    </v-list-item>
                  </v-list>

                </v-menu>
              </div>


            </v-col>
          </v-row>
        </client-only>

        <v-list flat>
          <v-list-item
              v-for="collection in collectionListData"
              :key="collection.id"
              target="_blank"
              :href="getCollectionTo(collection)"
          >
            <span>
              <v-chip>{{ collectionTypeToName(collection.collectionType) }}:</v-chip>
              <span class="ml-1">{{ collection.sourceTitle }}</span>
              <span class="text-grey float-right">{{ dateFilter(collection.createTime) }}</span>
              </span>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
        <div class="text-center">
          <v-pagination
              v-model="page"
              :length="totalPages"
              @update:modelValue="changePage"
          ></v-pagination>
        </div>
      </v-col>

      <!--      <v-col></v-col>-->
    </v-row>

  </div>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from '#app'
import {onMounted, ref} from 'vue'
import {
  useAxiosGetCollectionGroupListByUserId,
  useAxiosGetCollectionListByGroupId
} from '~/composables/Api/user/collection'
import {
  collectionGroup,
  CollectionType,
  CollectionTypeZh,
  getCollectionListByGroupIdParams,
  UserCollection
} from '~/types/user/collection'
import {warningMsg} from '~/composables/utils/toastification'
import {dateFilter} from '~/composables/useTools'

const route = useRoute()
const router = useRouter()
const uid = Number(route.params.id)
const collectionGroupList = ref<collectionGroup[]>()
onMounted(async () => {
  const {data: axiosResponse} = await useAxiosGetCollectionGroupListByUserId(uid)
  if (axiosResponse.code === 0) {
    collectionGroupList.value = axiosResponse.data
    if (gid.value === null) {
      await selectGroup(collectionGroupList.value[0])
      console.log('13123')
    } else {
      await selectGroup(collectionGroupList.value.find(item => item.id === gid.value))
    }

  } else {
    warningMsg(axiosResponse.msg)
  }
})

const currentSelectGroup = ref<collectionGroup>()
const collectionListData = ref<UserCollection[]>()
const gid = ref(Number(route.query.group) || null)
const page = ref(1)
const totalPages = ref(0)
const order = ref(1)
const orderBy = ['按时间升序', '按时间降序']
const selectCollectionType = ref<CollectionType>(CollectionType.Article)
const selectGroup = async (group) => {
  currentSelectGroup.value = group
  gid.value = group.id
  await router.push({
    query: {
      ...route.query,
      group: group.id,
    }
  })
  await loadCollectionList()
}

const selectOrderCollectionType = async (index) => {
  selectCollectionType.value = CollectionType[index]
  page.value = 1
  await loadCollectionList()
}

const selectOrder = async (index) => {
  order.value = index
  page.value = 1
  await loadCollectionList()
}

const loadCollectionList = async () => {
  let params: getCollectionListByGroupIdParams = {
    CollectionType: selectCollectionType.value,
    page: page.value,
    order: order.value === 0 ? 'ASC' : 'DESC',
  }
  console.log('CollectionType.Answer', CollectionType.Answer.toString())
  const {data: response} = await useAxiosGetCollectionListByGroupId(gid.value, params)
  if (response.code === 0) {
    collectionListData.value = response.data.content
    totalPages.value = response.data.totalPages
  } else {
    warningMsg(response.msg)
  }
}

const getCollectionTo = (collection: UserCollection) => {
  switch (collection.collectionType) {
    case CollectionType.Article:
      return `/article/${collection.sourceId}`
  }
}

const changePage = async (p: number) => {
  page.value = p
  await loadCollectionList()
}

const collectionTypeToName = (collectionType: CollectionType) => {
  switch (collectionType) {
    case CollectionType.Article:
      return '文章'
    case CollectionType.Question:
      return '问题'
    case CollectionType.Comment:
      return '评论'
    case CollectionType.Answer:
      return '回答'
  }
}
</script>
<style scoped>
.d-collection-list {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>