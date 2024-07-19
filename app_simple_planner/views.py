from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from .models import Task

def index(request):
    if request.user.is_authenticated:
        return render(request, 'todo_list/home.html')
    else:
        return render(request, 'pages/index.html')

@login_required
def todo_list(request, category=None, filter=None):

    #tasks = Task.objects.filter(user=request.user)
    tasks = Task.objects.filter(user=request.user)

    if category:
        tasks = tasks.filter(category=category)
    elif filter == 'completed':
        tasks = tasks.filter(completed=True)

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'add':
            add_task(request) 
            return redirect('todo_list')
        
        elif action == 'delete':
            task_id = request.POST.get('task_id')
            task = Task.objects.filter(id=task_id, user=request.user).first()
            if task:
                task.delete()

        elif action == 'complete':
            task_id = request.POST.get('task_id')
            task = Task.objects.filter(id=task_id, user=request.user).first()
            if task:
                task.completed = True
                task.save()

    Tasks = {
      'Tasks': tasks,
      'categories': Task.objects.values_list('category', flat=True).distinct(),
    }

    return render(request, 'todo_list/list.html',Tasks)
    

def home(request):
  return render(request, 'todo_list/home.html')


def register(request):
  if request.method == "GET" :
    return render(request, 'registration/register.html')
  else:
    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password2')

    if User.objects.filter(username=username).exists():
      return HttpResponse("Usuário já existe") 

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()
    print(f'Username: {username}, Password: {password}, Email: {email}')
    return redirect('login')  
    

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        print(f'Username: {username}, Password: {password}')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return render(request, 'todo_list/home.html')
        else:
            return HttpResponse("Usuário ou senha incorretos.")

    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    return redirect('index') 

def add_task(request):
   new_task = Task()
   new_task.title = request.POST.get('title')
   new_task.category = request.POST.get('category')
   new_task.user = request.user 

   print(f'Title: {new_task.title}, Category: {new_task.category}')
   new_task.save()
   print('Task saved successfully') 
   
