from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout



def index(request):
    if request.user.is_authenticated:
        return render(request, 'todo_list/home.html')
    else:
        return render(request, 'pages/index.html')

@login_required
def todo_list(request):
  return render(request, 'todo_list/list.html')

def home(request):
  return render(request, 'todo_list/home.html')


def register(request):
  if request.method == "GET" :
    return render(request, 'registration/register.html')
  else:
    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password')

    user = User.objects.filter(username=username)

    if user:
      return HttpResponse("Usuário já existe") 

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()
    return HttpResponse("Usuário criado!") 
    

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            # Redirecionar para uma página de sucesso, ou fazer outra coisa
            return render(request, 'todo_list/home.html')
        else:
            # Se o usuário não for encontrado, exibir uma mensagem de erro
            return HttpResponse("Usuário ou senha incorretos.")
            # Ou, se preferir, você pode retornar um render com um contexto de erro
            #return render(request, 'sua_template_de_login.html', {'erro': True})
    
    # Se for GET (ou qualquer outro método), apenas renderizar o formulário de login
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    return redirect('index')  # Redireciona para a página de login após o logout
