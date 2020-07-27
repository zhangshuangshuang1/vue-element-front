<template>

    <section>

        <!--工具条-->

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters">



                <el-form-item>

                    <el-button   @click="handleAdd" name='handleAdd'>新增</el-button>

                </el-form-item>



            </el-form>

        </el-col>

        <!--列表-->

        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

            <el-table-column prop="userId" label="用户ID" width="200" sortable>

            </el-table-column>

            <el-table-column prop="username" label="用户名" width="200" sortable>

            </el-table-column>

            <el-table-column prop="password" label="密码" width="200" sortable>

            </el-table-column>

            <el-table-column prop="userEmail" label="邮箱" width="200" sortable>

            </el-table-column>

            <el-table-column prop="registerTime" label="注册时间" width="200">

            </el-table-column>

            <el-table-column label="操作"  width="250">

                <template slot-scope="scope">

                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>           

                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>

                </template>

            </el-table-column>

        </el-table>

        <!--工具条-->

        <el-col :span="24" class="toolbar">

            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">

            </el-pagination>

        </el-col>

        <!--编辑界面-->

        <el-dialog title="编辑用户"  :visible.sync="editFormVisible"  :close-on-click-modal="false">

            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

                <el-form-item label="用户名" prop="username">

                    <el-input v-model="editForm.username" auto-complete="off" ></el-input>

                </el-form-item>

                 <el-form-item label="密码" prop="password">

                    <el-input v-model="editForm.password" auto-complete="off" ></el-input>

                </el-form-item>

                 <el-form-item label="邮箱" prop="userEmail">

                    <el-input v-model="editForm.userEmail" auto-complete="off" ></el-input>

                </el-form-item>



                <el-form-item label="注册时间" prop="registerTime">

                    <el-date-picker type="date" @change="dateChangeUnqualifiedList"   placeholder="选择日期" v-model='editForm.registerTime'  style="width: 100%;" >

                    </el-date-picker>

                </el-form-item>                                           

            </el-form>

            <div slot="footer" class="dialog-footer">

                <el-button @click.native="editFormVisible = false">取消</el-button>

                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>

            </div>

        </el-dialog>

        <!--新增界面-->

        <el-dialog title="新增用户" :visible.sync="addFormVisible" :close-on-click-modal="false">

            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">



                <el-form-item label="用户名" prop="username">

                    <el-input v-model="addForm.username" auto-complete="off"  name='username'></el-input>

                </el-form-item>



                <el-form-item label="密码" prop="password">

                    <el-input v-model="addForm.password" auto-complete="off"  name='password'></el-input>

                </el-form-item>



                <el-form-item label="邮箱" prop="userEmail">

                    <el-input v-model="addForm.userEmail" auto-complete="off"  name='userEmail'></el-input>

                </el-form-item>





                <el-form-item label="注册时间" prop="registerTime">

                    <el-date-picker type="date" @change="dateChangeUnqualifiedList" placeholder="选择日期" v-model='addForm.registerTime'  style="width: 100%;" >

                    </el-date-picker>

                </el-form-item>



            </el-form>

            <div slot="footer" class="dialog-footer">

                <el-button @click.native="addFormVisible = false" name='addFormCancle'>取消</el-button>

                <el-button type="primary" @click.native="addSubmit" :loading="addLoading" name='addSubmit'>提交</el-button>

            </div>

        </el-dialog>

    </section>

</template>

<script>

// import util from '../../common/js/util'

//import NProgress from 'nprogress'

import { getUserListPage, updateUser, addUser,deleteUser } from '@/api/api';



export default {

    data() {

        var checkName = (rule, value, callback) => {

            if (value === '' || isNaN(value)) {

                callback(new Error('请输入8位工号'));

            } else if (value.length !== 8) {

                callback(new Error('您输入的工号位数有错，请输入8位工号'));

            } else {

                callback();

            }

        };



        return {

            filters: {

                realName: ''

            },
            dialogVisible: false,
            users: [],

            total: 0,

            pageSize: 20,

            page: 1,

            projectList: [],

            privileges: [{ value: 'user', label: 'user' }, { value: 'admin', label: 'admin' }, { value: 'unknown', label: 'unknown' }],

            listLoading: false,

            sels: [], //列表选中列

            privilege: JSON.parse(sessionStorage.getItem('user')).privilege === 'admin',

            editFormVisible: false, //编辑界面是否显示

            editLoading: false,

            editFormRules: {

                name: [

                    { required: true, message: '请输入姓名', trigger: 'blur' }

                ]

            },

            //编辑界面数据

            editForm: {

                username: "",

                password: "",

                userEmail: "",

                registerTime:''

            },

            addForm: {

                username: "",

                password: "",

                userEmail: "",

                registerTime:''

            },





            addFormVisible: false, //新增界面是否显示

            addLoading: false,

            addFormRules: {

                loginName: [{ required: true, validator: checkName, trigger: "blur" }],

                privilege: [{ required: true, message: "请输入用户权限", trigger: "blur" }]

            }

        }

    },

    methods: {

        dateChangeUnqualifiedList(val) {

            this.addForm.registerTime = val;

        },

        handleCurrentChange(val) {

            this.page = val;

            this.getUsers();

        },

        //获取用户列表

        getUsers() {

            this.listLoading = true;

            getUserListPage().then((res) => {

                // this.total = res.data.total;

                this.users =JSON.parse(res.data.users);

                this.listLoading = false;

                //NProgress.done();

            });

        },



        handleAdd: function() {

            this.addFormVisible = true;

            this.addForm= {

                username: "",

                password: "",

                userEmail: "",

                registerTime:''

            }

        },

                //删除

        handleDel: function(index, row) {

            this.$confirm('确认删除该记录吗?', '提示', {

                type: 'warning'

            }).then(() => {



                let para = { userId: row.userId };

                deleteUser(para).then((res) => {



                    let { msg, code } = res.data;

                    if (code !== 200) {

                        this.$message({

                            message: msg,

                            type: 'error'

                        });

                    } else {

                        this.$message({

                            message: '删除成功',

                            type: 'success'

                        });

                    }

                    this.getUsers();

                });

            }).catch(() => {



            });

        },



        addSubmit: function() {

            this.$refs.addForm.validate((valid) => {

                if (valid) {

                    this.$confirm("确认提交吗？", "提示", {}).then(() => {

                        this.addLoading = true;

                        //NProgress.start();

                        let para = Object.assign({}, this.addForm);

                        addUser(para).then(res => {

                            let { msg, code } = res.data;

                            if (code === 500) {

                                this.$message({

                                    message: msg || '没有查看权限',

                                    type: 'error'

                                });

                                this.addLoading = false;

                                this.addFormVisible = false;

                            } else {

                                this.addLoading = false;

                                this.$message({

                                    message: "提交成功",

                                    type: "success"

                                });

                                this.$refs["addForm"].resetFields();

                                this.addFormVisible = false;

                                this.getUsers();

                            }



                        });

                    });

                }

            });

        },

        // },

        //显示编辑界面

        handleEdit: function(index, row) {
            console.log(333333333333333)
            this.editFormVisible = true;

            this.editForm = Object.assign({}, row);

        },

        //编辑

        editSubmit: function() {

            this.$refs.editForm.validate((valid) => {

                if (valid) {

                    this.$confirm('确认提交吗？', '提示', {}).then(() => {

                        this.editLoading = true;

                        let para = Object.assign({}, this.editForm);

                        updateUser(para).then((res) => {

                            this.editLoading = false;

                            this.$message({

                                message: '提交成功',

                                type: 'success'

                            });

                            this.$refs['editForm'].resetFields();

                            this.editFormVisible = false;

                            this.getUsers();

                        });

                    });

                }

            });

        },



        formatProjects: function(row, column) {

            if ((row.projects instanceof Array)) {

                return row.projects.toString();

            };

            return row.projects;

        },

        selsChange: function(sels) {

            this.sels = sels;

        },

    },

    mounted() {

        this.getUsers();

    }

}

</script>

<style scoped>

</style>