import numpy as np

# function that returns dy/dt
def model(z,t,k,A,Fin,Tin,Q,rhocp):
    h=z[0]
    T=z[1]
    dhdt = (1/A)*(Fin-(k * np.sqrt(h)))
    dTdt = ((Fin/(A*h))*(Tin-T))+(Q/(A*h*rhocp))
    #dzdt=[dhdt,dTdt]
    
    return  [dhdt,dTdt]
