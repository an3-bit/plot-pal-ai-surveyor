import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus, 
  FolderOpen, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  Layers,
  MapPin,
  FileText,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const projects = [
    {
      id: 1,
      name: "Westfield Subdivision",
      location: "Nairobi, Kenya",
      plots: 24,
      status: "In Progress",
      updated: "2 hours ago"
    },
    {
      id: 2,
      name: "Industrial Park Phase 2",
      location: "Mombasa, Kenya",
      plots: 12,
      status: "Completed",
      updated: "1 day ago"
    },
    {
      id: 3,
      name: "Residential Complex A",
      location: "Kisumu, Kenya",
      plots: 36,
      status: "Under Review",
      updated: "3 days ago"
    }
  ];

  const stats = [
    {
      title: "Total Projects",
      value: "23",
      change: "+12%",
      icon: <FolderOpen className="h-4 w-4" />
    },
    {
      title: "Plots Created",
      value: "1,247",
      change: "+18%",
      icon: <MapPin className="h-4 w-4" />
    },
    {
      title: "Compliance Rate",
      value: "98.5%",
      change: "+2.1%",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Active Clients",
      value: "15",
      change: "+5%",
      icon: <Users className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SurveyPro</h1>
              <p className="text-xs text-muted-foreground">Professional Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "overview" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "projects" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`text-sm font-medium transition-colors ${
                activeTab === "search" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Plot Search
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.organization}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground">
                Ready to create your next subdivision project?
              </p>
            </div>
            <Button variant="hero" size="lg">
              <Plus className="h-4 w-4" />
              New Subdivision
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="text-muted-foreground">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Your latest subdivision projects and their status
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FolderOpen className="h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </span>
                        <span>{project.plots} plots</span>
                        <span>{project.updated}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          project.status === "Completed" ? "default" :
                          project.status === "In Progress" ? "secondary" : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Shortcuts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Subdivision
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Search Plots
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Project completed</p>
                    <p className="text-xs text-muted-foreground">
                      Industrial Park Phase 2 - 2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Compliance review</p>
                    <p className="text-xs text-muted-foreground">
                      Westfield Subdivision - 1 day ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New project created</p>
                    <p className="text-xs text-muted-foreground">
                      Residential Complex A - 3 days ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};