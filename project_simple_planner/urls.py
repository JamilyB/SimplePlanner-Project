
from django.contrib import admin
from django.urls import path, include
from app_simple_planner import views  # Importa as views diretamente do app_sp
from app_simple_planner.views import login_view
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),  # Adicione a URL que aponta para a view
    path('todo_list/', views.todo_list, name='todo_list'),
    path('home/', views.home, name='home'),
    #path('login', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('login', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]