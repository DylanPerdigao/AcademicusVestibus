#!/usr/local/bin/python3.8
# -*- coding: utf-8 -*-

import random
import matplotlib.pyplot as plt
import numpy as np


"""verifica se ganhou ou perdeu"""
def checkWin(target,choosen,string):
	if(target==choosen):
		string += "PLAYER WINS\n"
		return string,True
	else:
		string += "...player looses\n"
		return string,False

"""Simula o jogo do Monty Hall"""
def montyHall(n,hasChanged):
	#escolhe a porta do carro e jogador
	carDoor = int((random.random()*n)+1)
	playerDoor = int((random.random()*n)+1)
	string = "Player choose door: {}\n".format(str(playerDoor))
	#apresentador abre porta
	openedDoor = None
	while(openedDoor==None or openedDoor==playerDoor or openedDoor==carDoor):
		openedDoor = int((random.random()*n)+1)
	string += "Apresentator opens door: {}\n".format(str(openedDoor))
	#caso o jogador decide mudar de porta
	if hasChanged:
		newPlayerDoor = None
		while(newPlayerDoor==None or newPlayerDoor==playerDoor or newPlayerDoor==openedDoor):
			newPlayerDoor = int((random.random()*n)+1)
		string += "Player changes his door to door: {}\n".format(str(newPlayerDoor))
		string += "and... The car is on door: {}\n".format(str(carDoor))
		return checkWin(carDoor,newPlayerDoor,string)
	else:
		string += "and... The car is on door: {}\n".format(str(carDoor))
		return checkWin(carDoor,playerDoor,string)

"""Simulação"""
def simulation(doors,iterations,hasChanged,isPrinted):
	results = list()
	for i in range(iterations):
		string,hasWon = montyHall(doors,hasChanged)
		results.append(hasWon)
		if isPrinted:
			print(string)
	return results

def probability(res):
	size = len(res)
	occor = res.count(True)
	return occor/size

"""Faz grafico da simulação"""
def stats(doors,iterations,isPrinted):
	probWithout = probability(simulation(doors,iterations,False,isPrinted))
	probWith = probability(simulation(doors,iterations,True,isPrinted))
	x=[probWithout,probWith]
	plt.bar(["No","Yes"],x)
	plt.title("Number of wins")
	plt.xlabel('Has changed the door?')
	plt.ylabel('Frequency')
	plt.show()


if __name__=='__main__':
	stats(3,1000000,False)