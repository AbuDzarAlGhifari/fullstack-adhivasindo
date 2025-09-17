import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Star } from 'lucide-react';
import { navigation, settings } from './navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { logo } from '@/assets/dummy';

const AppSidebar = () => {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center">
                    <div className="group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center">
                            <img src={logo} alt="logo" className=" h-10 mr-2" />
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link
                                                to={item.url}
                                                className={cn(
                                                    'hover:bg-white hover:text-black text-gray-400',
                                                    isActive &&
                                                        'bg-white text-black font-medium'
                                                )}
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span className="flex-1">
                                                    {item.title}
                                                </span>
                                                {isActive && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 group-data-[collapsible=icon]:hidden" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>

                        <Separator className="my-7" />

                        <SidebarMenu>
                            <h1 className="text-gray-400 font-semibold">
                                PROFILE
                            </h1>
                            {settings.map((item) => {
                                const isActive = location.pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link
                                                to={item.url}
                                                className={cn(
                                                    'hover:bg-white hover:text-black text-gray-400',
                                                    isActive &&
                                                        'bg-white text-black font-medium'
                                                )}
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span className="flex-1">
                                                    {item.title}
                                                </span>
                                                {isActive && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 group-data-[collapsible=icon]:hidden" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                        <Separator className="my-7" />

                        <SidebarMenuButton asChild>
                            <Link
                                to="/"
                                className="hover:bg-white hover:text-black text-gray-400"
                            >
                                <LogOut />
                                <span className="flex-1">Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
