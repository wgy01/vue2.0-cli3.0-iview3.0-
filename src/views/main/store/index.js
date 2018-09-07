import routers from '@/router/router.js'; //调用路由表
import plant from '@/toolBox'; //调用工具

const mainFrame = {
	
	state: {//数据
		
		menuList: [],//要显示的菜单列表
		
	},
	
	mutations: { //事件集,mutation是同步的
		
		menuFiltration(state){//左侧菜单过滤
			
			let routerList = routers;//所有路由列表
			
			let userAccess = [1,3];//用户权限
			
			
			
			
			
//			let traverseTree = (_node) => {
//			
//			    if (!_node) return
//				
//				console.log(_node.name);
//				
//				if (_node.children && _node.children.length > 0) {
//					
//					console.log(_node.children.length);
//					
//					_node.children.forEach((item,index) => {
//						
//						traverseTree(item);
//						
//					})
//					
//			    }
//							
//			}
//			
//			appRouter.forEach((item,index) => {
//				
//				traverseTree(item);
//				
//			})
			
			
			
			
			
			
			for(let i=0; i<routerList.length; i++){ //遍历路由列表
				
				let main_item = routerList[i];
				
				if(main_item.meta.menuHide){ //在菜单中不显示的路由
						
					routerList.splice(i,1);
						
					i = -1;
						
				}
				
				if(main_item.children && main_item.children.length > 0){ //有子路由的顶级路由
					
					if(main_item.meta.access){ //带有权限的顶级路由
						
						if(plant.access_decide(main_item.meta.access,userAccess)){ //权限符合的顶级路由
							
							for(let j=0; j<main_item.children.length; j++){//遍历一级子路由
								
								let children_item = main_item.children[j];
								
								if(children_item.meta.access){ //带有权限的一级子路由
									
									if(plant.access_decide(children_item.meta.access,userAccess)){ //权限符合的一级子路由
										
										
										
									}else{ //权限不符合的一级子路由
										
										children_item.splice(j,1);
							
										j = -1;
										
									}
									
								}else{ //不带有权限的一级子路由
									
									
									
								}
								
								if(children_item.children && children_item.children.length > 0){ //有子路由的一级子路由
									
								}
								
							}
							
						}else{//权限不符合的顶级路由
							
							routerList.splice(i,1);
							
							i = -1;
							
						}
						
					}else{ //不带有权限的顶级路由
						
						
					}
					
				}else{//没有子路由的顶级路由
					
					routerList.splice(i,1);
							
					i = -1;
					
				}
				
			}
			
			console.log(routerList);
			
		}
		
	},
	
	getters:{//计算属性
		
	},
	
	actions:{//专门放置异步交互代码,Action 是异步的
		
	},
	
	modules:{//模板
		
	}
	
}

export default mainFrame;
