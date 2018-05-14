import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { system } from 'src/api';
import departmentApi from 'src/api/systemManage/department';
import { tree } from 'src/utils';
import { MyStore } from 'src/redux';
import { message } from 'antd';
import { Modal } from 'antd';
import role from 'src/api/systemManage/role';

class ModulesAction extends ActionBasic<ModulesState> {
    /************************** 部门管理start  ************************************/
    /** 查询部门 */
    public departmentQuery = async () => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let data = await departmentApi.depList(this, { companyId });
        let queryData: any = data.res;

        if (!data.er) {
            /** 构建树 */
            this.buildTree(queryData);
            this.modulesState.departmentList = data.res;
        }

        this.setModulesState(this.modulesState);
    }

    /** 
     * 根据部门查询人员 
     * @param 部门ID
     */
    public departmentUser = async (depId) => {
        const { user } = MyStore.instance.getState();
        if (depId.length > 0) {
            let companyId = user.userInfo.companyId;
            let departmentId = depId[0];
            let data = await departmentApi.departmentUser(this, { departmentId, companyId });
            /** 设置选中的树节点 */
            this.modulesState.selectTreeCode = depId[0];
            this.modulesState.userlist = data.res;
            this.modulesState.isDisabled = false;
        } else {
            this.modulesState.isDisabled = true;
        }

        this.setModulesState(this.modulesState);
    }

    /** 弹出新增窗口 */
    public addDepUserModal = async () => {
        this.modulesState.isDepModal = true;
        this.setModulesState(this.modulesState);
    }

    /** 关闭新增窗口 */
    public closeDepUserModal = async () => {
        this.modulesState.isDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 关闭修改窗口 */
    public closeUpdDepUserModal = async () => {
        this.modulesState.isUpdDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 保存部门 */
    public saveDep = async (parentDepartmentId, depNumber, name, description?) => {
        const { user } = MyStore.instance.getState();
        /** 组装数据 */
        let department = {
            companyId: user.userInfo.companyId,
            parentDepartmentId: parentDepartmentId,
            number: depNumber,
            name: name,
            description: description,
            isDeleted: false,
            createTime: new Date().getTime(),
            departmentId: '',
            updateTime: new Date().getTime(),
        };
        // 调用接口
        let data = await departmentApi.createDep(this, department);

        if (!data.er) {
            // 重新加载部门
            this.departmentQuery();
            /** 关闭窗口 */
            this.modulesState.isDepModal = false;
            this.setModulesState(this.modulesState);

            message.success('保存成功');
        }

    }

    /** 删除部门 */
    public deleteDep = async (depId) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let departmentId = depId;
        // 调用接口
        let data = await departmentApi.deleteDep(this, { departmentId, companyId });

        if (!data.er) {
            // 重新加载部门
            this.departmentQuery();
            message.success('删除成功');
        }
    }

    /** 根据ID获取部门 */
    public getDepartment = async (departmentId) => {
        this.modulesState.isUpdDepModal = true;


        /** 修改的对象 */
        this.modulesState.departmentList.forEach((element, index) => {
            if (element.departmentId === departmentId) {
                this.modulesState.department = element;
            }
        });
        this.buildTree(this.modulesState.departmentList);
        this.setModulesState(this.modulesState);
    }

    /** 修改部门 */
    public updDep = async (dep) => {
        const { user } = MyStore.instance.getState();
        /** 组装数据 */
        let department = {
            companyId: user.userInfo.companyId,
            parentDepartmentId: dep.parentDepartmentId,
            number: dep.number,
            name: dep.name,
            description: dep.description,
            isDeleted: false,
            departmentId: dep.departmentId,
            updateTime: new Date().getTime(),
            createTime: dep.createTime,
        };

        // 调用接口
        let data = await departmentApi.updateDep(this, department);

        if (!data.er) {
            // 重新加载部门
            this.departmentQuery();
            this.modulesState.isUpdDepModal = false;
            this.setModulesState(this.modulesState);
            message.success('保存成功');
        }
    }


    /** 打开设置窗口 */
    public openSetDepModal = async () => {
        this.modulesState.isSetDepModal = true;
        this.setModulesState(this.modulesState);
    }

    /** 关闭设置窗口 */
    public closeSetDepModal = async () => {
        this.modulesState.isSetDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 设置员工部门 */
    public setUserDep = async (departmentId) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let userIds: string[] = this.modulesState.userIds;
        let data = await departmentApi.setUserDep(this, { companyId, departmentId, userIds });
        console.log(data);
        this.modulesState.isSetDepModal = false;
        this.setModulesState(this.modulesState);
        message.success('操作成功');
    }


    /** 修改上级部门 */
    public updParentDep = async (dep) => {
        const { user } = MyStore.instance.getState();
        /** 组装数据 */
        let department = {
            companyId: user.userInfo.companyId,
            parentDepartmentId: dep.parentDepartmentId,
            number: dep.number,
            name: dep.name,
            description: dep.description,
            isDeleted: false,
            departmentId: dep.departmentId,
            updateTime: new Date().getTime(),
            createTime: dep.createTime,
        };

        // 调用接口
        let data = await departmentApi.updateParentDep(this, department);
        if (!data.er) {
            // 重新加载部门
            this.departmentQuery();
            this.modulesState.isUpdDepModal = false;
            this.setModulesState(this.modulesState);
            message.success('保存成功');
        }
    }


    /** 构建树 */
    public buildTree = async (list) => {
        let buildTreeParam = [];
        for (let i = 0; i < list.length; i++) {
            let treeObj = {
                title: '',
                value: '',
                key: '',
                id: '',
                pId: '',
                number: ''
            };
            treeObj.number = list[i].number;
            treeObj.title = list[i].name;
            treeObj.value = list[i].departmentId;
            treeObj.key = list[i].departmentId;
            treeObj.id = list[i].departmentId;
            treeObj.pId = list[i].parentDepartmentId;
            buildTreeParam.push(treeObj);
        }
        this.modulesState.treeData = tree(buildTreeParam);
        this.setModulesState(this.modulesState);
    }

    /************************** 部门管理end ************************************/

    /***************************** 关联公司start ******************************/

    /** 关联公司 页面 是否显示 搜索条件框 */
    toggle = () => {
        this.modulesState.company.companyExpand = !this.modulesState.company.companyExpand;
        this.setModulesState(this.modulesState);
    }

    /** 批量禁用 */
    ban = async () => {
        let select: any = this.modulesState.companyState.selectedRows;
        let connectionId: Array<string> = [];
        select.forEach(element => {
            connectionId.push(element.connectionId);
        });
        await system.companyDisable(this, { list: connectionId });
        this.modulesState.companyState.selectedRowKeys = [];
        this.modulesState.companyState.selectedRows = [];
        let data: any = await system.findCompanyList(this, {});
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /** 批量启用 */
    active = async () => {
        let select: any = this.modulesState.companyState.selectedRows;
        let connectionId: Array<string> = [];
        select.forEach(element => {
            connectionId.push(element.connectionId);
        });
        await system.companyEnable(this, { list: connectionId });
        this.modulesState.companyState.selectedRowKeys = [];
        this.modulesState.companyState.selectedRows = [];
        let data: any = await system.findCompanyList(this, {});
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /** 查询公司列表 */
    public findCompanyList = async () => {
        let data = await system.findCompanyList(this, { companyId: this.modulesState.user.companyId });
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /** 公司信息 禁用\启用 */
    public onUpdate = async (record: any) => {
        if (record.connectionState === 1) {
            // 启用转禁用
            let connectionId: Array<string> = [];
            let id: string = record.connectionId;
            connectionId.push(id);
            await system.companyDisable(this, { list: connectionId });
        } else {
            // 禁用转启用
            let connectionId: Array<string> = [];
            let id: string = record.connectionId;
            connectionId.push(id);
            await system.companyEnable(this, { list: connectionId });
        }
        let data: any = await system.findCompanyList(this, {});
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /**
     * 查询公司
     */
    public selectCompany = async (connectionName: any, connectionTaxId: any) => {
        let data: any = await system.findCompanyList(this, { connectionName: connectionName, connectionTaxId: connectionTaxId, companyId: this.modulesState.user.companyId });
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /** 保存当前选择的选项卡key */
    setActivatedTab = (key) => {
        this.modulesState.company.activatedTab = key;
        this.setModulesState(this.modulesState);
    }

    /** 勾选关联公司 */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.modulesState.companyState.selectedRowKeys = selectedRowKeys;
        this.modulesState.companyState.selectedRows = selectedRows;
        this.setModulesState(this.modulesState);
    }

    /*****************************  关联公司end ******************************/

    /*****************************  集团资料start ******************************/

    /** 获取当前公司的集团信息 */
    getGroupInfoByCompanyId = async () => {
        let companyId: string = this.modulesState.user.companyId;
        let data: any = await system.getGroupInfo(this, { companyId: companyId });
        this.modulesState.company.list = [];
        if (data.res !== undefined || data.res !== '') {
            if (this.modulesState !== undefined) {
                this.modulesState.groupInfo.name = data.res.name;
                this.modulesState.groupInfo.description = data.res.description;
                this.modulesState.groupInfo.orgId = data.res.orgId;
                this.modulesState.groupInfo.createTime = data.res.createTime;
                this.modulesState.groupInfo.updateTime = data.res.updateTime;
            }
        }
        this.setModulesState(this.modulesState);
    }

    /** 集团公司信息是否修改 */
    isEdit = async () => {
        this.modulesState.groupInfo.disable = !this.modulesState.groupInfo.disable;
        this.setModulesState(this.modulesState);
    }

    /** 更新集团公司信息 */
    updateGroupInfo = async (org: any) => {
        org.updateTime = new Date().getTime();
        await system.updateGroupInfo(this, org);
        this.modulesState.groupInfo.disable = !this.modulesState.groupInfo.disable;
        this.setModulesState(this.modulesState);
    }

    /*****************************  集团资料end ******************************/

    /************************************ 用户管理相关动作 开始**************************************/

    /**
     * 获取用户列表
     * @param PageNumber 
     * @param pageSize
     * @param nickName
     * @param email
     * @param isActivated
     * @param acceptStatus
     */
    public getUserList = async (values?: any) => {
        let data = await system.userList(this, {
            nickName: values && values.nickName,
            email: values && values.email,
            isActivated: values && values.isActivated,
            acceptStatus: values && values.acceptStatus
        });
        if (!data.er && data.res) {
            this.modulesState.total = data.res.pageMeta.total;
            this.modulesState.currentPage = data.res.pageMeta.pageNum;
            this.modulesState.pageSize = data.res.pageMeta.pageSize;
            this.modulesState.data = data.res.items;
            this.modulesState.userDataLoding = false;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 查询公司角色信息
     * @param companyId 公司ID
     */
    public getUserCompanyRole = async (companyId) => {
        let data = await system.userCompanyRole(this, { companyId: companyId });
        if (!data.er) {
            this.modulesState.userCompanyRole = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 获取用户所在公司的当前权限
     * @param userId 用户ID
     */

    public getUserCurrentRole = async (userId) => {
        let data = await system.userCurrentRole(this, { userId: userId });
        if (!data.er) {
            this.modulesState.userCurrentRole = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 编辑用户角色
     */
    public userRoleEdit = async (userId, companyId, roles) => {
        let data = await system.userRoleUpdate(this, { userId: userId, companyId: companyId, roles: roles });
        if (!data.er) {
            this.success('成功', '修改成功！');
        }
    }

    /** 
     * 编辑用户
     * @param values
     */
    public userEdit = async (values) => {
        let data = await system.userEdit(this, {
            userId: values.userId,
            companyId: values.companyId,
            nickName: values.nickName,
            phone: values.phone,
            description: values.description
        });
        if (!data.er) {
            this.getUserList();
            this.setModulesState(this.modulesState);
            this.success('成功', '修改成功！');
        }
    }

    /** 新增用户 */
    public userAdd = async (companyId, values) => {
        let data = await system.userAdd(this, {
            companyId: companyId,
            nickName: values.nickName,
            email: values.email,
            phone: values.phone,
            description: values.description
        });
        if (!data.er) {
            // 在数组最前面添加一条数据
            // this.modulesState.data.splice(0, 0, data.res);
            // this.modulesState.data.push(data.res);
            this.getUserList();
            // this.setModulesState(this.modulesState);
            this.success('成功', '新增成功！');
        }
    }

    /** 
     * 用户禁用或启用
     * @param record
     */
    public userDisOrEna = async (record, status: boolean) => {
        let data = await system.userDisOrEna(this, {
            companyId: record.companyId, userId: record.userId, status: status
        });
        if (!data.er) {
            this.getUserList();
            this.setModulesState(this.modulesState);
            this.success('成功', '设置成功！');
        }
    }

    /** 
     * 重新发送
     * @param record
     */
    public userSend = async (record) => {
        let data = await system.userSend(this, { userId: record.userId });
        if (!data.er) {
            this.success('成功', '发送成功！');
        }
    }

    /** 
     * 用户详情
     * @param userId
     */
    public userDetail = async (userId: string) => {
        let data = await system.userDetail(this, { userId });
        if (!data.er) {
            this.modulesState.detail = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /** 
     * 弹框函数
     * @param falg 例如：add、edtil、detail 
     * @param type 例如：show、hide
     * @param record 操作数据 一般像edit detail才会用到此字段
     */
    public userModalFn = (flag, type, record?: any) => {
        // 详情弹框
        if (flag === 'detail') {
            if (type === 'show') {
                this.modulesState.detailVisible = true;
                this.modulesState.detail = record;
            } else {
                this.modulesState.detailVisible = false;
                this.modulesState.detail = {};
            }
        }
        // 新增弹框
        if (flag === 'add') {
            if (type === 'show') {
                this.modulesState.addVisible = true;
            } else {
                this.modulesState.addVisible = false;
            }
        }
        // 编辑弹框
        if (flag === 'edit') {
            if (type === 'show') {
                this.modulesState.detail = record;
                this.modulesState.editVisible = true;
            } else {
                this.modulesState.detail = {};
                this.modulesState.editVisible = false;
            }
        }
        // 绑定角色弹框
        if (flag === 'role') {
            if (type === 'show') {
                this.modulesState.detail = record;
                this.modulesState.roleVisible = true;
            } else {
                this.modulesState.detail = {};
                this.modulesState.roleVisible = false;
            }
        }
        this.setModulesState(this.modulesState);
    }

    /** 改变icon样式和显示筛选主键 */
    public userSearchIcon = () => {
        // 改变图标样式
        this.modulesState.iconStyle = this.modulesState.iconStyle ? false : true;
        // 显示筛选组件
        this.modulesState.searchState = this.modulesState.searchState ? false : true;
        this.setModulesState(this.modulesState);
    }

    /** 操作提示框 */
    public success(title: string, content: string) {
        Modal.success({
            title: title,
            content: content,
        });
    }

    /************************************ 用户管理相关动作 结束**************************************/

    /************************************* 角色管理 start  ******************************************************************** */
    /**
     * 获取角色管理得数据
     */
    public getRoleList = async () => {
        let data = await role.getRoleList(this, {});
        if (!data.er) {
            this.modulesState.list = data.res;
            this.setModulesState(this.modulesState);
        }
    }
    /**
     * 获取下拉框角色权限数据
     */
    public getRolePrivilegeList = async () => {
        let data = await role.getRolePrivilege(this, { paramCondition: this.modulesState.paramCondition });
        if (!data.er) {
            this.modulesState.selectData = data.res;
            for (let i = 0; i < this.modulesState.selectData.length; i++) {
                let rule = {
                    value: this.modulesState.selectData[i].id.toString(),
                    label: this.modulesState.selectData[i].name
                };
                this.modulesState.selectDatas.push(rule);
            }
            this.setModulesState(this.modulesState);
        }
    }
    /**
     * 新增按钮的弹框
     */
    public addVisible = async (value) => {
        this.modulesState.addRoleVisible = true;
        this.setModulesState(this.modulesState);
    }
    /**
     * 取消按钮的弹窗
     */
    public noAddVisible = async () => {
        this.modulesState.addRoleVisible = false;
        this.setModulesState(this.modulesState);
    }
    /**
     * 新增角色保存
     */
    public saveRole = async (value) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let name = value.name;
        let description = value.description;
        let ruleGroups = value.ruleGroups.join(',');
        let index = await role.saveRole(this, { companyId, name, description, ruleGroups });
        if (!index) {
            Modal.error({
                content: '删除失败',
            });
        } else {
            Modal.success({
                title: '成功',
                content: '成功添加！',
            });
        }
        this.getRoleList();
        this.modulesState.addRoleVisible = false;
        this.setModulesState(this.modulesState);
    }
    /**
     * 删除角色
     */
    public deleteRole = async (value) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let roleId = value.roleId;
        let data = await role.deleteRole(this, { companyId, roleId });
        if (data) {
            Modal.success({
                title: '成功',
                content: '删除角色成功！',
            });
        } else {
            Modal.error({
                content: '删除失败',
            });
        }
        this.getRoleList();
    }
    /**
     * 编辑的方法
     */
    public redactvisible = async (value) => {
        this.modulesState.roleList = value;
        this.modulesState.redactPrivilege = [];
        let name = value.ruleGroups;
        let index = name.split(',');
        this.modulesState.redactPrivilege = index;
        this.modulesState.redactValue = value;
        this.modulesState.visible = true;
        this.setModulesState(this.modulesState);
    }
    /**
     * 编辑保存的方法
     */
    public redactSaveVisible = async (value) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let name = value.name;
        let description = value.description;
        let ruleGroups = value.ruleGroups.join(',');
        let roleId = this.modulesState.roleList.roleId;
        let createTime = new Date().getTime();
        let rules = this.modulesState.roleList.rules;
        let data = await role.updataRole(this, { companyId, name, description, ruleGroups, roleId, createTime, rules });
        this.modulesState.visible = false;
        this.setModulesState(this.modulesState);
        if (!data) {
            Modal.error({
                title: '修改失败',
            });
        } else {
            Modal.success({
                title: '成功',
                content: '修改角色成功！',
            });
        }
        this.getRoleList();
    }
    /**
     * 取消编辑的弹窗
     */
    public noRedactVisible = async () => {
        this.modulesState.visible = false;
        this.setModulesState(this.modulesState);
    }
    /**
     * 获取公司资料数据
     */
    public getCompanyInfo = async () => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let data = await role.getCompanyInfoList(this, { companyId });
        if (!data.er) {
            this.modulesState.companyInfoList = data.res;
            this.setModulesState(this.modulesState);
        }
    }
    /************************************* 角色管理 end  ******************************************************************** */

}

export default new ModulesAction();