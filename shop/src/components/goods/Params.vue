<template>
  <div>
    <h3>分类参数</h3>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 :closable="false"(是否展示“X”号) show-icon(显示图标) -->
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon>
      </el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader v-model="selectedCateKeys"
          :options="cateList"
          :props="cateProps"
          @change="handleChange"
          :clearable="true">
          </el-cascader>
        </el-col>
        <el-col></el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 将标签页改为many -->
        <el-tab-pane label="动态参数" name="many">
          <el-button size="mini" type="primary" :disabled="isButtonDisabled" @click="addDialogVisible=true">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item, i) in scope.row.attr_vals"
                :key="i" closable @close="handleClose(i, scope.row)">{{item}}</el-tag>
                <!-- 输入的文本框 -->
                <el-input class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 将标签页改为only -->
        <el-tab-pane label="静态属性" name="only">
          <el-button size="mini" type="primary" :disabled="isButtonDisabled" @click="addDialogVisible=true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染Tag标签 -->
                <el-tag v-for="(item, i) in scope.row.attr_vals"
                :key="i" closable @close="handleClose(i, scope.row)">{{item}}</el-tag>
                <!-- 输入的文本框 -->
                <el-input class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="'添加' + titleText" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改参数的对话框 -->
    <el-dialog :title="'修改' + titleText" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 添加参数的对话框 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类列表
      cateList: [],
      // 用户在级联下拉菜单中选中的分类id
      selectedCateKeys: [],
      // 配置级联菜单中数据如何展示
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // tab页签激活显示的页签项
      activeName: 'many',
      // 用来保存动态参数数据
      manyTableData: [],
      // 用来保存静态属性数据
      onlyTableData: [],
      // 控制添加参数.属性对话框的显示或隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: ''
      },
      // 添加表单验证规则
      addFormRules: {
        attr_name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false,
      // 修改的表单数据对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      // 控制按钮与文本框的切换
      inputVisible: false,
      // 文本框中输入的内容
      inputValue: ''
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      // 获取所有的商品分类列表
      const { data: res } = await this.$http.get('categories')

      if (res.meta.status !== 200) {
        return this.$message.error('获取分类数据失败')
      }
      // 将数据列表赋值给cateList
      this.cateList = res.data
      // 保存总数据条数
      // this.total = res.data.total
      // console.log(res.data);
    },
    handleChange() {
      this.getParamsData()
    },
    handleTabClick() {
      // console.log(this.activeName)
      this.getParamsData()
    },
    // 获取参数的列表数据
    async getParamsData() {
      // 当用户在级联菜单中选择内容改变时触发
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      // console.log(this.selectedCateKeys)
      // 发送请求，根据用户选择的三级分类和面板获取参数数据
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        { params: { sel: this.activeName } }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('获取参数列表数据失败')
      }
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        // 添加一个bool值控制文本框的显示或者隐藏
        item.inputVisible = false
        // 添加一个inputValue保存文本框值
        item.inputValue = ''
      })
      // console.log(res.data)
      if (this.activeName === 'many') {
        // 获取的是动态参数
        this.manyTableData = res.data
      } else if (this.activeName === 'only') {
        // 获取的是静态属性
        this.onlyTableData = res.data
      }
    },
    // 监听添加对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addParams() {
      // 当用户点击对话框中的确定时，校验表单
      this.$refs.addFormRef.validate(async valid => {
        // 校验不通过，return
        if (!valid) return
        // 校验通过，发送请求完成添加参数或者属性
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        )
        // console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加' + this.titleText + '数据失败')
        }
        this.$message.success('添加' + this.titleText + '数据成功')
        this.addDialogVisible = false
        this.getParamsData()
      })
    },
    // 点击按钮，展示修改的对话框
    async showEditDialog(id) {
      // 查询当前参数的信息
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${id}`,
        {
          params: { attr_sel: this.activeName }
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('获取参数信息失败！')
      }

      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 重置修改的表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击按钮，修改参数信息
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          { attr_name: this.editForm.attr_name, attr_sel: this.activeName }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('修改参数失败！')
        }

        this.$message.success('修改参数成功！')
        this.getParamsData()
        this.editDialogVisible = false
      })
    },
    // 根据Id删除对应的参数项
    async removeParams(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该参数, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 用户取消了删除的操作
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }

      // 删除的业务逻辑
      const { data: res } = await this.$http.delete(
        `categories/${this.cateId}/attributes/${id}`
      )

      if (res.meta.status !== 200) {
        return this.$message.error('删除参数失败！')
      }

      this.$message.success('删除参数成功！')
      this.getParamsData()
    },
    // 文本框失去焦点，或摁下了 Enter 都会触发
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 如果没有return，则证明输入的内容，需要做后续处理
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 需要发起请求，保存这次操作
      this.saveAttrVals(row)
    },
    // 将对 attr_vals 的操作，保存到数据库
    async saveAttrVals(row) {
      // 需要发起请求，保存这次操作
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('修改参数项失败！')
      }

      this.$message.success('修改参数项成功！')
    },
    // 点击按钮，展示文本输入框
    showInput(row) {
      row.inputVisible = true
      // 让文本框自动获得焦点
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除对应的参数可选项
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttrVals(row)
    }
  },
  computed: {
    // 添加计算属性用来获取按钮禁用与否
    isButtonDisabled() {
      return this.selectedCateKeys.length !== 3
    },
    // 获取选中的三级分类id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[this.selectedCateKeys.length - 1]
      }
      return null
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}

.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 120px;
}
</style>
