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
            this.modulesState.depModulesState.departmentList = data.res;
        }

        this.setModulesState(this.modulesState);
    }

    /** 
     * 根据部门查询人员 
     * @param 部门ID
     */
    public departmentUser = async (depId: string[]) => {
        const { user } = MyStore.instance.getState();
        this.modulesState.depModulesState.isDepLoadding = true;
        if (depId.length > 0) {
            let companyId = user.userInfo.companyId;
            let departmentId = depId[0];
            this.modulesState.depModulesState.departmentId = departmentId;
            let data = await departmentApi.departmentUser(this, { departmentId, companyId });
            if (!data.er) {
                /** 设置选中的树节点 */
                this.modulesState.depModulesState.selectTreeCode = depId[0];
                this.modulesState.depModulesState.userlist = data.res;
                for (let i = 0; i < this.modulesState.depModulesState.userlist.length; i++) {
                    this.modulesState.depModulesState.userlist[i].key = this.modulesState.depModulesState.userlist[i].userId;
                }
                this.modulesState.depModulesState.isDisabled = false;
                this.modulesState.depModulesState.isDepLoadding = false;
            }
        } else {
            this.modulesState.depModulesState.isDisabled = true;
        }

        this.setModulesState(this.modulesState);
    }

    /** 弹出新增窗口 */
    public addDepUserModal = async () => {
        this.modulesState.depModulesState.isDepModal = true;
        this.setModulesState(this.modulesState);
    }

    /** 关闭新增窗口 */
    public closeDepUserModal = async () => {
        this.modulesState.depModulesState.isDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 关闭修改窗口 */
    public closeUpdDepUserModal = async () => {
        this.modulesState.depModulesState.isUpdDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 保存部门 */
    public saveDep = async (parentDepartmentId: string, depNumber: string, name: string,
        description?: string) => {
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
            this.modulesState.depModulesState.isDepModal = false;
            this.setModulesState(this.modulesState);

            message.success('保存成功');
        }

    }

    /** 删除部门 */
    public deleteDep = async (depId: string) => {
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
    public getDepartment = async (departmentId: string) => {
        this.modulesState.depModulesState.isUpdDepModal = true;


        /** 修改的对象 */
        this.modulesState.depModulesState.departmentList.forEach((element, index) => {
            if (element.departmentId === departmentId) {
                this.modulesState.depModulesState.department = element;
            }
        });
        this.buildTree(this.modulesState.depModulesState.departmentList);
        this.setModulesState(this.modulesState);
    }

    /** 修改部门 */
    public updDep = async (dep: { parentDepartmentId: string, number: string, name: string, description: string, departmentId: string, createTime: number }) => {
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
            this.modulesState.depModulesState.isUpdDepModal = false;
            this.setModulesState(this.modulesState);
            message.success('保存成功');
        }
    }


    /** 打开设置窗口 */
    public openSetDepModal = async () => {
        this.modulesState.depModulesState.isSetDepModal = true;
        this.setModulesState(this.modulesState);
    }

    /** 关闭设置窗口 */
    public closeSetDepModal = async () => {
        this.modulesState.depModulesState.isSetDepModal = false;
        this.setModulesState(this.modulesState);
    }

    /** 设置员工部门 */
    public setUserDep = async (departmentId: string) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
        let userIds: string[] = this.modulesState.depModulesState.userIds;
        let data = await departmentApi.setUserDep(this, { companyId, departmentId, userIds });
        if (!data.er) {
            this.modulesState.depModulesState.isSetDepModal = false;
            this.departmentUser([this.modulesState.depModulesState.departmentId]);
            this.modulesState.depModulesState.selectedDepRows = [];
            this.modulesState.depModulesState.selectedDepRowKeys = [];
            this.setModulesState(this.modulesState);
            message.success('操作成功');
        }
    }


    /** 修改上级部门 */
    public updParentDep = async (dep: { parentDepartmentId: string, number: string, name: string, description: string, departmentId: string, createTime: number }) => {
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
            this.modulesState.depModulesState.isUpdDepModal = false;
            this.setModulesState(this.modulesState);
            message.success('保存成功');
        }
    }

    /** 刷新功能 */
    public refreshDep = async () => {
        this.modulesState.depModulesState.selectedDepRows = [];
        this.modulesState.depModulesState.selectedDepRowKeys = [];
        this.modulesState.depModulesState.userlist = [];
        this.departmentUser([this.modulesState.depModulesState.departmentId]);
        this.setModulesState(this.modulesState);
    }

    /** 设置选中表格的key */
    public setDepTableKey = async () => {
        this.setModulesState(this.modulesState);
    }


    /** 构建树 */
    public buildTree = async (list: {number:string,name:string,departmentId:string,parentDepartmentId:string}[]) => {
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
        this.modulesState.depModulesState.treeData = tree(buildTreeParam);
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

    /**
     * 公司信息 禁用\启用
     * 
     * @param connectionState  公司状态
     * @param connectionId  公司Id
     */
    public onUpdate = async (record: { connectionState: number, connectionId: string }) => {
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
     * 
     * @param connectionName  公司名字
     * @param connectionTaxId  公司税号
     */
    public selectCompany = async (connectionName: string, connectionTaxId: string) => {
        let data: any = await system.findCompanyList(this, { connectionName: connectionName, connectionTaxId: connectionTaxId, companyId: this.modulesState.user.companyId });
        this.modulesState.company.list = data.res;
        this.setModulesState(this.modulesState);
    }

    /** 保存当前选择的选项卡key */
    setActivatedTab = (key) => {
        this.modulesState.company.activatedTab = key;
        this.setModulesState(this.modulesState);
    }

    /**
     * 勾选关联公司
     * 
     * @param selectedRowKeys  选中数据的key
     * @param selectedRows  选中数据
     */
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
        // this.modulesState.company.list = [];
        if (data.res !== undefined || data.res !== '') {
            if (this.modulesState !== undefined) {
                this.modulesState.groupInfoModulesState.name = data.res.name;
                this.modulesState.groupInfoModulesState.description = data.res.description;
                this.modulesState.groupInfoModulesState.orgId = data.res.orgId;
                this.modulesState.groupInfoModulesState.createTime = data.res.createTime;
                this.modulesState.groupInfoModulesState.updateTime = data.res.updateTime;
            }
        }
        this.setModulesState(this.modulesState);
    }

    /** 集团公司信息是否修改 */
    isEdit = async () => {
        this.modulesState.groupInfoModulesState.disable = !this.modulesState.groupInfoModulesState.disable;
        this.setModulesState(this.modulesState);
    }

    /**
     * 更新集团公司信息
     * 
     * @param orgId  集团Id
     * @param name 集团名字
     * @param description 集团备注
     * @param createTime 创建时间
     * @param updateTime 更新时间
     */
    updateGroupInfo = async (org: { orgId: string, name: string, description: string, createTime: string, updateTime: number }) => {
        org.updateTime = new Date().getTime();
        await system.updateGroupInfo(this, org);
        this.modulesState.groupInfoModulesState.disable = !this.modulesState.groupInfoModulesState.disable;
        this.setModulesState(this.modulesState);
    }

    /*****************************  集团资料end ******************************/

    /************************************ 用户管理相关动作 开始**************************************/

    /**
     * 获取用户列表
     * @param nickName
     * @param email
     * @param isActivated
     * @param acceptStatus
     */
    public getUserList = async (screen?: { nickName: string, email: string, isActivated: boolean, acceptStatus: string }) => {
        // 封装接口参数
        let param = {
            nickName: screen && screen.nickName,
            email: screen && screen.email,
            isActivated: screen && screen.isActivated,
            acceptStatus: screen && screen.acceptStatus
        };
        // 接口调用
        let data = await system.userList(this, param);
        if (!data.er && data.res) {
            this.modulesState.userModulesState.total = data.res.pageMeta.total;
            this.modulesState.userModulesState.data = data.res.items;
            this.modulesState.userModulesState.userDataLoding = false;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 查询公司角色信息
     * @param companyId 公司ID
     */
    public getUserCompanyRole = async (companyId: string) => {
        // 调用接口
        let data = await system.userCompanyRole(this, { companyId });
        if (!data.er) {
            this.modulesState.userModulesState.userCompanyRole = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 获取用户所在公司的当前权限
     * @param userId 用户ID
     */

    public getUserCurrentRole = async (userId: string) => {
        // 调用接口
        let data = await system.userCurrentRole(this, { userId });
        if (!data.er) {
            this.modulesState.userModulesState.userCurrentRole = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /**
     * 编辑用户角色
     * @param userId 用户ID
     * @param companyId 公司ID
     * @param roles 角色数组
     */
    public userRoleEdit = async (userId: string, companyId: string, roles: string[]) => {
        // 封装接口参数
        let param = {
            userId: userId,
            companyId: companyId,
            roles: roles
        };
        // 接口调用
        let data = await system.userRoleUpdate(this, param);
        if (!data.er) {
            this.success('成功', '修改成功！');
        }
    }

    /** 
     * 编辑用户
     * @param values
     */
    public userEdit = async (record: { userId: string, companyId: string, nickName: string, phone: string, description: string }) => {
        // 封装接口参数
        let param = {
            userId: record.userId,
            companyId: record.companyId,
            nickName: record.nickName,
            phone: record.phone,
            description: record.description
        };
        // 接口调用
        let data = await system.userEdit(this, param);
        if (!data.er) {
            let list = this.modulesState.userModulesState.data;
            for (let index = 0; index < list.length; index++) {
                if (list[index].userId === record.userId) {
                    list[index].nickName = record.nickName;
                    list[index].phone = record.phone;
                    list[index].description = record.description;
                    break;
                }
            }
            this.setModulesState(this.modulesState);
            this.success('成功', '修改成功！');
        }
    }

    /** 新增用户 */
    public userAdd = async (record: { nickName: string, email: string, phone: string, description: string }) => {
        const { user } = MyStore.instance.getState();
        // 封装接口参数
        let param = {
            companyId: user.userInfo.companyId,
            nickName: record.nickName,
            email: record.email,
            phone: record.phone,
            description: record.description
        };
        // 接口调用
        let data = await system.userAdd(this, param);
        if (!data.er) {
            this.getUserList();
            this.success('成功', '新增成功！');
        }
    }

    /** 
     * 用户禁用或启用
     * @param companyId 公司ID
     * @param userId 用户ID
     * @param status 禁用或启用
     */
    public userDisOrEna = async (record: { companyId: string, userId: string }, status: boolean) => {
        // 封装接口参数
        let param = {
            companyId: record.companyId,
            userId: record.userId,
            status: status
        };
        // 接口调用
        let data = await system.userDisOrEna(this, param);
        if (!data.er) {
            this.getUserList();
            this.success('成功', '设置成功！');
        }
    }

    /** 
     * 重新发送
     * @param userId 用户ID
     */
    public userSend = async (userId: string) => {
        // 调用接口
        let data = await system.userSend(this, { userId });
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
            this.modulesState.userModulesState.detail = data.res;
            this.setModulesState(this.modulesState);
        }
    }

    /** 
     * 弹框函数
     * @param falg 例如：add、edtil、detail 
     * @param type 例如：show、hide
     * @param record 操作数据 一般像edit detail才会用到此字段
     */
    public userModalFn = (flag: string, type: string, record?: any) => {
        // 详情弹框
        if (flag === 'detail') {
            if (type === 'show') {
                this.modulesState.userModulesState.detailVisible = true;
                this.modulesState.userModulesState.detail = record;
            } else {
                this.modulesState.userModulesState.detailVisible = false;
                this.modulesState.userModulesState.detail = {};
            }
        }
        // 新增弹框
        if (flag === 'add') {
            if (type === 'show') {
                this.modulesState.userModulesState.addVisible = true;
            } else {
                this.modulesState.userModulesState.addVisible = false;
            }
        }
        // 编辑弹框
        if (flag === 'edit') {
            if (type === 'show') {
                this.modulesState.userModulesState.detail = record;
                this.modulesState.userModulesState.editVisible = true;
            } else {
                this.modulesState.userModulesState.detail = {};
                this.modulesState.userModulesState.editVisible = false;
            }
        }
        // 绑定角色弹框
        if (flag === 'role') {
            if (type === 'show') {
                this.modulesState.userModulesState.detail = record;
                this.modulesState.userModulesState.roleVisible = true;
            } else {
                this.modulesState.userModulesState.detail = {};
                this.modulesState.userModulesState.roleVisible = false;
            }
        }
        this.setModulesState(this.modulesState);
    }

    /** 改变icon样式和显示筛选主键 */
    public userSearchIcon = () => {
        // 改变图标样式
        this.modulesState.userModulesState.iconStyle = this.modulesState.userModulesState.iconStyle ? false : true;
        // 显示筛选组件
        this.modulesState.userModulesState.searchState = this.modulesState.userModulesState.searchState ? false : true;
        this.setModulesState(this.modulesState);
    }

    /** 
     * 操作提示框
     * @param title 标题
     * @param content 提示内容
     */
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
            this.modulesState.ModulesStateRole.list = data.res;
            this.setModulesState(this.modulesState);
        }
    }
    /**
     * 获取下拉框角色权限数据
     */
    public getRolePrivilegeList = async () => {
        let data = await role.getRolePrivilege(this, {});
        if (!data.er) {
            this.modulesState.ModulesStateRole.selectData = data.res;
            if (this.modulesState.ModulesStateRole.selectData.length === this.modulesState.ModulesStateRole.selectDatas.length) {
                return;
            } else {
                this.modulesState.ModulesStateRole.selectData.forEach(element => {
                    let rule = {
                        value: element.id.toString(),
                        label: element.name
                    };
                    this.modulesState.ModulesStateRole.selectDatas.push(rule);
                });
            }
        }
        this.setModulesState(this.modulesState);
    }
    /**
     * 新增按钮的弹框
     */
    public addVisible = async () => {
        this.modulesState.ModulesStateRole.addRoleVisible = true;
        this.setModulesState(this.modulesState);
    }
    /**
     * 取消按钮的弹窗
     */
    public noAddVisible = async () => {
        this.modulesState.ModulesStateRole.addRoleVisible = false;
        this.setModulesState(this.modulesState);
    }
    /**
     * 新增角色保存
     */
    public saveRole = async (name: string, description: string, value: [{}]) => {
        const { user } = MyStore.instance.getState();
        // 组装入参数据
        let companyId = user.userInfo.companyId;
        let ruleGroups = value.join(',');

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
        this.modulesState.ModulesStateRole.addRoleVisible = false;
        this.setModulesState(this.modulesState);
    }
    /**
     * 删除角色
     */
    public deleteRole = async (roleId: string) => {
        const { user } = MyStore.instance.getState();
        let companyId = user.userInfo.companyId;
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
    public redactvisible = async (value:{companyId: string,createTime: number, description: string, isPublic: number, name: string, pRoleId: any, roleId: string, ruleGroups: string, rules: string}) => {
        this.modulesState.ModulesStateRole.roleList = value;
        this.modulesState.ModulesStateRole.redactValue = value;
        let name = value.ruleGroups;
        let index = name.split(',');
        this.modulesState.ModulesStateRole.redactPrivilege = index;
        this.modulesState.ModulesStateRole.visible = true;
        this.setModulesState(this.modulesState);
    }
    /**
     * 编辑保存的方法
     */
    public redactSaveVisible = async (value: { name: string, description: string, ruleGroups: string[] }) => {
        debugger;
        const { user } = MyStore.instance.getState();
        // 组装入参数据
        let companyId = user.userInfo.companyId;
        let name = value.name;
        let description = value.description;
        let ruleGroups = value.ruleGroups.join(',');
        let roleId = this.modulesState.ModulesStateRole.roleList.roleId;
        let createTime = new Date().getTime();
        let rules = this.modulesState.ModulesStateRole.roleList.rules;

        let data = await role.updataRole(this, { companyId, name, description, ruleGroups, roleId, createTime, rules });
        this.modulesState.ModulesStateRole.visible = false;
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
        this.modulesState.ModulesStateRole.visible = false;
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
            this.modulesState.ModulesStateRole.companyInfoList = data.res;
            this.setModulesState(this.modulesState);
        }
    }


    /************************************* 角色管理 End  ******************************************************************** */

}

export default new ModulesAction();