
from django.contrib import admin
from django.urls import path, include
from app_simple_planner import views  
from app_simple_planner.views import login_view
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('todo_list/', views.todo_list, name='todo_list'),
    path('category/<str:category>/', views.todo_list, name='todo_list_by_category'),
    path('completed/', views.todo_list, {'filter': 'completed'}, name='completed_tasks'),
    path('home/', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]